"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Key,
  LogOut,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  History,
  Home,
} from "lucide-react";

interface LicenseRecord {
  code: string;
  activatedAt: string;
  expiresAt: string;
  status: "active" | "expired";
}

const STORAGE_KEY = "ftn_license_data";

function loadLicenses(): LicenseRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as LicenseRecord[];
    return data.map((l) => ({
      ...l,
      status: new Date(l.expiresAt) > new Date() ? "active" : "expired",
    }));
  } catch {
    return [];
  }
}

function saveLicenses(data: LicenseRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [licenseInput, setLicenseInput] = useState("");
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [mounted, setMounted] = useState(false);

  const activeLicense = licenses.find((l) => l.status === "active");

  const refreshStatuses = useCallback(() => {
    setLicenses((prev) =>
      prev.map((l) => ({
        ...l,
        status: new Date(l.expiresAt) > new Date() ? "active" : "expired",
      }))
    );
  }, []);

  useEffect(() => {
    setMounted(true);
    setLicenses(loadLicenses());
  }, []);

  useEffect(() => {
    if (!activeLicense) { setRemaining(0); return; }
    const tick = () => {
      const ms = new Date(activeLicense.expiresAt).getTime() - Date.now();
      setRemaining(Math.max(0, ms));
      if (ms <= 0) refreshStatuses();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activeLicense, refreshStatuses]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const code = licenseInput.trim().toUpperCase();
    if (!code) return;

    // Format check: FTN-XXXX-XXXX
    if (!/^FTN-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
      setError("Invalid format. Expected: FTN-XXXX-XXXX");
      return;
    }

    const alreadyUsed = licenses.find((l) => l.code === code);
    if (alreadyUsed) {
      setError("This license code has already been used.");
      return;
    }

    if (activeLicense) {
      setError("You already have an active license. Wait for it to expire.");
      return;
    }

    setActivating(true);
    await new Promise((r) => setTimeout(r, 1000));

    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const newRecord: LicenseRecord = {
      code,
      activatedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: "active",
    };

    const updated = [newRecord, ...licenses];
    setLicenses(updated);
    saveLicenses(updated);
    setLicenseInput("");
    setSuccess("License activated! Valid for 24 hours.");
    setActivating(false);
  };

  if (!mounted) return <div className="min-h-screen bg-gray-950" />;

  const pct = activeLicense
    ? Math.max(0, (remaining / (24 * 3600 * 1000)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-72 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-base font-black tracking-tight text-white">
              Flash<span className="text-amber-400">Tether</span>{" "}
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Network</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="px-4 py-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
            <Shield className="w-4 h-4" />
            Dashboard
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </nav>

        {/* License status mini-card */}
        <div className="px-4 mt-2">
          {activeLicense ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">License Active</span>
              </div>
              <p className="font-mono text-xs text-gray-300 mb-2 break-all">{activeLicense.code}</p>
              <div className="text-center">
                <span className="font-mono text-lg font-bold text-white tabular-nums">
                  {formatCountdown(remaining)}
                </span>
                <p className="text-xs text-gray-500 mt-0.5">remaining</p>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">No active license</span>
              </div>
            </div>
          )}
        </div>

        {/* Activate form */}
        <div className="px-4 mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Activate License
          </p>
          <form onSubmit={handleActivate} className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                value={licenseInput}
                onChange={(e) => { setLicenseInput(e.target.value); setError(""); setSuccess(""); }}
                placeholder="FTN-XXXX-XXXX"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-sm font-mono uppercase transition-all"
              />
            </div>
            {error && (
              <div className="flex items-start gap-1.5 text-red-400 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-start gap-1.5 text-amber-400 text-xs">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {success}
              </div>
            )}
            <button
              type="submit"
              disabled={!licenseInput.trim() || activating || !!activeLicense}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-amber-500/10"
            >
              {activating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Activating...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  Activate
                </>
              )}
            </button>
            {activeLicense && (
              <p className="text-xs text-gray-600 text-center">
                Wait for current license to expire
              </p>
            )}
          </form>
        </div>

        {/* Spacer + bottom actions */}
        <div className="mt-auto px-4 pb-5 pt-4 border-t border-gray-800 space-y-1">
          {!activeLicense && (
            <Link
              href="/#packages"
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-amber-400 hover:bg-amber-500/10 text-sm font-medium transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              Get New License
            </Link>
          )}
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">

          <h1 className="text-2xl font-bold text-white mb-1">My Dashboard</h1>
          <p className="text-gray-500 text-sm mb-8">Manage your FlashTether NETWORK license</p>

          {/* License status card */}
          {activeLicense ? (
            <div className="bg-gray-900 border border-amber-500/30 rounded-2xl overflow-hidden mb-6 shadow-lg shadow-amber-500/5">
              <div className="bg-gradient-to-r from-amber-500/15 to-transparent border-b border-amber-500/15 px-6 py-4 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold text-white">License Active</span>
                <span className="ml-auto text-xs text-gray-500">Expires in</span>
                <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">
                  {formatCountdown(remaining)}
                </span>
              </div>
              <div className="h-1.5 bg-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="px-6 py-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">License Code</p>
                  <p className="font-mono text-white font-medium">{activeLicense.code}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Activated At</p>
                  <p className="text-white">{formatDate(activeLicense.activatedAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Expires At</p>
                  <p className="text-white">{formatDate(activeLicense.expiresAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Duration</p>
                  <p className="text-white">24 hours</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-8 mb-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-white font-semibold mb-2">No Active License</h3>
              <p className="text-gray-500 text-sm mb-5">
                Enter your license code on the left panel to activate your 24-hour access.
              </p>
              <Link
                href="/#packages"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                <Zap className="w-4 h-4" />
                Get a License
              </Link>
            </div>
          )}

          {/* License history */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              <h2 className="text-white font-semibold text-sm">License History</h2>
              <span className="ml-auto text-xs text-gray-600">{licenses.length} total</span>
            </div>

            {licenses.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <Shield className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">No licenses activated yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {licenses.map((lic, i) => (
                  <div key={i} className="px-6 py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-white">{lic.code}</span>
                        {lic.status === "active" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700/60 text-gray-500">
                            <XCircle className="w-3 h-3" />
                            Expired
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                        <span>Activated: {formatDate(lic.activatedAt)}</span>
                        <span>Expired: {formatDate(lic.expiresAt)}</span>
                      </div>
                    </div>
                    {lic.status === "expired" && (
                      <Link
                        href="/#packages"
                        className="flex-shrink-0 text-xs text-amber-500 hover:text-amber-400 transition-colors whitespace-nowrap"
                      >
                        Renew →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Renew CTA — shown when all licenses expired */}
          {licenses.length > 0 && !activeLicense && (
            <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Your license has expired</p>
                <p className="text-gray-500 text-xs">Purchase a new plan to continue using FlashTether NETWORK.</p>
              </div>
              <Link
                href="/#packages"
                className="flex-shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-lg transition-all"
              >
                Get License
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
