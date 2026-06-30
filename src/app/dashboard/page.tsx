"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  LayoutDashboard,
  Key,
  Zap,
} from "lucide-react";

interface License {
  id: string;
  license_key: string;
  plan_type: string;
  status: "active" | "expired" | "pending";
  is_activated: boolean;
  activated_at: string | null;
  valid_from: string;
  valid_until: string;
}

interface Transaction {
  id: string;
  amount_usd: number;
  status: "completed" | "pending" | "failed";
  crypto: string;
  chain: string;
  tx_hash: string;
  created_at: string;
}

const MOCK_LICENSES: License[] = [
  {
    id: "1",
    license_key: "FLASH-DEMO-2024-0001",
    plan_type: "demo",
    status: "active",
    is_activated: true,
    activated_at: "2026-06-01T10:00:00Z",
    valid_from: "2026-06-01T10:00:00Z",
    valid_until: "2026-06-02T10:00:00Z",
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_001",
    amount_usd: 40,
    status: "completed",
    crypto: "USDT",
    chain: "TRC20",
    tx_hash: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    created_at: "2026-06-01T09:55:00Z",
  },
];

function StatusBadge({ status }: { status: string }) {
  const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium";
  if (status === "active" || status === "completed")
    return (
      <span className={`${base} bg-emerald-500/20 text-emerald-400`}>
        <CheckCircle className="w-3 h-3" />
        {status}
      </span>
    );
  if (status === "expired" || status === "failed")
    return (
      <span className={`${base} bg-red-500/20 text-red-400`}>
        <XCircle className="w-3 h-3" />
        {status}
      </span>
    );
  return (
    <span className={`${base} bg-yellow-500/20 text-yellow-400`}>
      <Clock className="w-3 h-3" />
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"licenses" | "transactions">("licenses");
  const [licenses, setLicenses] = useState<License[]>(MOCK_LICENSES);
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [licenseKey, setLicenseKey] = useState("");
  const [activateError, setActivateError] = useState("");
  const [activating, setActivating] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActivateError("");
    if (!licenseKey.trim()) return;
    setActivating(true);
    await new Promise((r) => setTimeout(r, 1000));

    const key = licenseKey.trim().toUpperCase();
    const exists = licenses.find((l) => l.license_key === key);
    if (exists) {
      setActivateError("This license key is already in your account.");
    } else {
      const newLicense: License = {
        id: `new-${Date.now()}`,
        license_key: key,
        plan_type: "basic",
        status: "active",
        is_activated: true,
        activated_at: new Date().toISOString(),
        valid_from: new Date().toISOString(),
        valid_until: new Date(Date.now() + 86400000).toISOString(),
      };
      setLicenses((prev) => [newLicense, ...prev]);
      setLicenseKey("");
    }
    setActivating(false);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

  const hasActiveLicense = licenses.some((l) => l.status === "active" && l.is_activated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-400">Welcome back</p>
            </div>
          </div>
          <div className="flex gap-3">
            {hasActiveLicense && (
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all"
              >
                <Zap className="w-4 h-4" />
                Open Software
              </button>
            )}
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-all"
            >
              Home
            </button>
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-slate-400 text-sm font-medium">Active Licenses</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {licenses.filter((l) => l.status === "active").length}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <h3 className="text-slate-400 text-sm font-medium">Total Transactions</h3>
            </div>
            <p className="text-3xl font-bold text-white">{transactions.length}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <h3 className="text-slate-400 text-sm font-medium">Member Since</h3>
            </div>
            <p className="text-lg font-semibold text-white">June 2026</p>
          </div>
        </div>

        {/* License activation */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Activate License Key</h2>
          <form onSubmit={handleActivate} className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => {
                  setLicenseKey(e.target.value);
                  setActivateError("");
                }}
                placeholder="Enter your license key (e.g., XXXX-XXXX-XXXX-XXXX)"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {activateError && (
                <p className="text-red-400 text-sm mt-2">{activateError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!licenseKey.trim() || activating}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
            >
              {activating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Activating...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  Activate
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setTab("licenses")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                tab === "licenses"
                  ? "text-emerald-400 border-b-2 border-emerald-500 bg-slate-700/30"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              My Licenses
            </button>
            <button
              onClick={() => setTab("transactions")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                tab === "transactions"
                  ? "text-emerald-400 border-b-2 border-emerald-500 bg-slate-700/30"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              Transaction History
            </button>
          </div>

          {/* Licenses tab */}
          {tab === "licenses" && (
            <div className="divide-y divide-slate-700/50">
              {licenses.length === 0 ? (
                <div className="p-12 text-center">
                  <Shield className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No licenses yet.</p>
                  <button
                    onClick={() => router.push("/#packages")}
                    className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                  >
                    Browse plans →
                  </button>
                </div>
              ) : (
                licenses.map((lic) => (
                  <div key={lic.id} className="p-5 hover:bg-slate-700/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-white">{lic.license_key}</span>
                          <StatusBadge status={lic.status} />
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          <span>
                            Plan:{" "}
                            <span className="text-slate-200 capitalize">{lic.plan_type}</span>
                          </span>
                          <span>
                            Valid until:{" "}
                            <span className="text-slate-200">{formatDate(lic.valid_until)}</span>
                          </span>
                          {lic.is_activated && lic.activated_at && (
                            <span>
                              Activated:{" "}
                              <span className="text-slate-200">
                                {formatDate(lic.activated_at)}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      {lic.is_activated && lic.status === "active" && (
                        <button
                          onClick={() => router.push("/")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-all"
                        >
                          <Zap className="w-3 h-3" />
                          Open Software
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Transactions tab */}
          {tab === "transactions" && (
            <div className="divide-y divide-slate-700/50">
              {transactions.length === 0 ? (
                <div className="p-12 text-center">
                  <CreditCard className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No transactions yet.</p>
                </div>
              ) : (
                transactions.map((tx) => (
                  <div key={tx.id} className="p-5 hover:bg-slate-700/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold">${tx.amount_usd}</span>
                          <StatusBadge status={tx.status} />
                          <span className="text-xs text-slate-400">
                            {tx.crypto}
                            {tx.chain ? ` (${tx.chain})` : ""}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          <span>
                            Date:{" "}
                            <span className="text-slate-200">{formatDate(tx.created_at)}</span>
                          </span>
                          {tx.tx_hash && (
                            <span>
                              TX:{" "}
                              <span className="font-mono text-slate-300">
                                {tx.tx_hash.slice(0, 16)}...
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Buy more */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/#packages")}
            className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Need a new license? Browse plans →
          </button>
        </div>
      </div>
    </div>
  );
}
