"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, Key, LogOut, Zap, Clock, CheckCircle, XCircle, AlertTriangle,
  ChevronRight, History, Home, LayoutDashboard,
} from "lucide-react";
import {
  activateLicense, loadUserLicenses, formatDate, formatCountdown,
  getTrxBalance, setTrxBalance, TRX_REQUIRED,
  type License,
} from "@/lib/license";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail]           = useState("");
  const [userName, setUserName]     = useState("");
  const [current, setCurrent]       = useState<License | null>(null);
  const [history, setHistory]       = useState<License[]>([]);
  const [licenseInput, setInput]    = useState("");
  const [activating, setActivating] = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");
  const [remaining, setRemaining]   = useState(0);
  const [mounted, setMounted]       = useState(false);
  const [trxBalance, setTrxBal]     = useState(0);

  const reload = useCallback((em: string) => {
    const data = loadUserLicenses(em);
    setCurrent(data.current);
    setHistory(data.history);
  }, []);

  useEffect(() => {
    const em   = localStorage.getItem("cv_user_email") ?? "";
    const name = localStorage.getItem("cv_user_name")  ?? "User";
    setEmail(em);
    setUserName(name);
    reload(em);

    // Sync TRX balance from server (admin-confirmed value)
    const localTrx = getTrxBalance(em);
    setTrxBal(localTrx);

    if (em) {
      fetch(`/api/trx-balance?email=${encodeURIComponent(em)}`)
        .then((r) => r.json())
        .then((data: { balance: number }) => {
          if (data.balance > 0 && data.balance !== localTrx) {
            setTrxBalance(em, data.balance);
            setTrxBal(data.balance);
          }
        })
        .catch(() => {});
    }

    setMounted(true);
  }, [reload]);

  // Live countdown
  useEffect(() => {
    if (!current) { setRemaining(0); return; }
    const tick = () => {
      const ms = new Date(current.expiresAt).getTime() - Date.now();
      const left = Math.max(0, ms);
      setRemaining(left);
      if (left === 0) reload(email);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [current, email, reload]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) { setError("Please log in first."); return; }

    setActivating(true);
    await new Promise((r) => setTimeout(r, 900));
    const result = activateLicense(email, licenseInput);
    setActivating(false);

    if (!result.success) {
      setError(result.error ?? "Activation failed.");
      return;
    }

    reload(email);
    setInput("");
    setSuccess(`${result.license!.planName} plan activated — ${result.license!.durationDays} days!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("cv_user_name");
    localStorage.removeItem("cv_user_email");
    router.push("/login");
  };

  if (!mounted) return <div className="min-h-screen bg-gray-950" />;

  const pct = current
    ? Math.max(0, (remaining / (current.durationDays * 86400000)) * 100)
    : 0;

  const allLicenses = current ? [current, ...history] : history;

  return (
    <div className="min-h-screen bg-gray-950 flex text-white">

      {/* ── SIDEBAR ── */}
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

        {/* User */}
        {email && (
          <div className="px-5 py-3 border-b border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/25 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{userName}</p>
                <p className="text-[10px] text-gray-500 truncate">{email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="px-4 py-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
            <Shield className="w-4 h-4" />
            My License
          </div>
          {current && (
            <Link
              href="/software"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </nav>

        {/* Current license mini-card */}
        <div className="px-4 mt-1">
          {current ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">{current.planName} Active</span>
              </div>
              <p className="font-mono text-xs text-gray-400 mb-2 break-all">{current.code}</p>
              <div className="text-center">
                <span className="font-mono text-base font-bold text-white tabular-nums">
                  {formatCountdown(remaining)}
                </span>
                <p className="text-xs text-gray-500 mt-0.5">remaining</p>
              </div>
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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Activate License</p>
          <form onSubmit={handleActivate} className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                value={licenseInput}
                onChange={(e) => { setInput(e.target.value); setError(""); setSuccess(""); }}
                placeholder="FTN-30D-2K-XXXXX"
                disabled={!!current}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-sm font-mono uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
            {error && (
              <div className="flex items-start gap-1.5 text-red-400 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-start gap-1.5 text-emerald-400 text-xs">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {success}
              </div>
            )}
            <button
              type="submit"
              disabled={!licenseInput.trim() || activating || !!current}
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
            {current && (
              <p className="text-xs text-gray-600 text-center">Active license must expire first</p>
            )}
          </form>
        </div>

        {/* TRX Balance */}
        <div className="px-4 mt-4 mb-1">
          <div className={`p-3 rounded-xl flex items-center justify-between ${
            trxBalance >= TRX_REQUIRED
              ? "bg-emerald-500/10 border border-emerald-500/20"
              : "bg-amber-500/10 border border-amber-500/20"
          }`}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">TRX Balance</p>
              <p className={`text-sm font-bold tabular-nums ${trxBalance >= TRX_REQUIRED ? "text-emerald-400" : "text-amber-400"}`}>
                {trxBalance.toLocaleString()} TRX
              </p>
            </div>
            <p className="text-[10px] text-slate-600">req. {TRX_REQUIRED.toLocaleString()}</p>
          </div>
          {!trxBalance || trxBalance < TRX_REQUIRED ? (
            <Link
              href="/software/receive"
              className="mt-2 w-full flex items-center justify-center gap-2 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-lg transition-all"
            >
              <Zap className="w-3 h-3" /> TRX Yatır →
            </Link>
          ) : null}
        </div>

        {/* Bottom */}
        <div className="mt-auto px-4 pb-5 pt-4 border-t border-gray-800 space-y-1">
          {!current && (
            <Link
              href="/#packages"
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-amber-400 hover:bg-amber-500/10 text-sm font-medium transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              Get New License
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-white mb-1">My License</h1>
          <p className="text-gray-500 text-sm mb-8">Manage your FlashTether NETWORK access</p>

          {/* Active license card */}
          {current ? (
            <div className="bg-gray-900 border border-amber-500/30 rounded-2xl overflow-hidden mb-6 shadow-lg shadow-amber-500/5">
              <div className="bg-gradient-to-r from-amber-500/15 to-transparent border-b border-amber-500/15 px-6 py-4 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold text-white">{current.planName} — Active</span>
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
                  <p className="font-mono text-white">{current.code}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Plan</p>
                  <p className="text-white">{current.planName} ({current.durationDays} days)</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Activated</p>
                  <p className="text-white">{formatDate(current.activatedAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Expires</p>
                  <p className="text-white">{formatDate(current.expiresAt)}</p>
                </div>
              </div>
              <div className="px-6 pb-5">
                <Link
                  href="/software"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Open Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-8 mb-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-white font-semibold mb-2">No Active License</h3>
              <p className="text-gray-500 text-sm mb-5">
                Enter your license code in the left panel to activate access.
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

          {/* History */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              <h2 className="text-white font-semibold text-sm">License History</h2>
              <span className="ml-auto text-xs text-gray-600">{allLicenses.length} total</span>
            </div>

            {allLicenses.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <Shield className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">No licenses activated yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {allLicenses.map((lic, i) => {
                  const isActive = lic.status === "active";
                  return (
                    <div key={i} className="px-6 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-sm text-white">{lic.code}</span>
                          <span className="text-xs text-gray-600">{lic.planName}</span>
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/20">
                              <CheckCircle className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700/60 text-gray-500">
                              <XCircle className="w-3 h-3" /> Expired
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                          <span>Activated: {formatDate(lic.activatedAt)}</span>
                          <span>{isActive ? "Expires" : "Expired"}: {formatDate(lic.expiresAt)}</span>
                          <span>{lic.durationDays} days</span>
                        </div>
                      </div>
                      {!isActive && (
                        <Link
                          href="/#packages"
                          className="flex-shrink-0 text-xs text-amber-500 hover:text-amber-400 transition-colors whitespace-nowrap"
                        >
                          Renew →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Expired CTA */}
          {allLicenses.length > 0 && !current && (
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
