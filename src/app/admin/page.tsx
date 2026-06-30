"use client";

import { useState } from "react";
import { Lock, CheckCircle, XCircle, Zap, RefreshCw } from "lucide-react";

interface PendingDeposit {
  email: string;
  claimedAmount: number;
  claimedAt: string;
}

export default function AdminPage() {
  const [key, setKey]             = useState("");
  const [authed, setAuthed]       = useState(false);
  const [authError, setAuthError] = useState("");
  const [deposits, setDeposits]   = useState<PendingDeposit[]>([]);
  const [loading, setLoading]     = useState(false);
  const [customAmounts, setCustom] = useState<Record<string, string>>({});
  const [results, setResults]     = useState<Record<string, string>>({});

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/admin/pending-deposits?key=${encodeURIComponent(key)}`);
    setLoading(false);
    if (res.status === 401) { setAuthError("Yanlış şifre."); return; }
    const data = await res.json() as { ok: boolean; pending: PendingDeposit[] };
    setDeposits(data.pending ?? []);
    setAuthed(true);
  };

  const refresh = async () => {
    setLoading(true);
    const res  = await fetch(`/api/admin/pending-deposits?key=${encodeURIComponent(key)}`);
    const data = await res.json() as { ok: boolean; pending: PendingDeposit[] };
    setDeposits(data.pending ?? []);
    setLoading(false);
  };

  const confirm = async (email: string, amount: number) => {
    const finalAmount = parseFloat(customAmounts[email] ?? String(amount));
    if (!finalAmount || finalAmount <= 0) return;
    const res = await fetch(
      `/api/admin/confirm-trx?email=${encodeURIComponent(email)}&amount=${finalAmount}&key=${encodeURIComponent(key)}`
    );
    if (res.ok) {
      setResults((prev) => ({ ...prev, [email]: `✅ ${finalAmount.toLocaleString("tr-TR")} TRX onaylandı` }));
      setDeposits((prev) => prev.filter((d) => d.email !== email));
    } else {
      setResults((prev) => ({ ...prev, [email]: "❌ Hata oluştu" }));
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xl">⚡</span>
            <span className="text-base font-black text-white">
              Flash<span className="text-amber-400">Tether</span>
              <span className="text-xs font-semibold tracking-widest text-gray-500 ml-1 uppercase">Admin</span>
            </span>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={key}
                onChange={(e) => { setKey(e.target.value); setAuthError(""); }}
                placeholder="Admin şifresi"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm"
                required
              />
            </div>
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Lock className="w-4 h-4" />}
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h1 className="text-lg font-black text-white">
              Flash<span className="text-amber-400">Tether</span>
              <span className="text-xs font-semibold tracking-widest text-gray-500 ml-1 uppercase">Admin Paneli</span>
            </h1>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h2 className="font-semibold text-sm">Bekleyen TRX Yatırımları</h2>
            <span className="ml-auto text-xs text-gray-600">{deposits.length} bekliyor</span>
          </div>

          {deposits.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <CheckCircle className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Bekleyen yatırım yok.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {deposits.map((d) => (
                <div key={d.email} className="px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-mono text-sm text-white">{d.email}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(d.claimedAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}
                      </p>
                    </div>
                    <span className="text-amber-400 font-bold text-base tabular-nums font-mono">
                      {d.claimedAmount.toLocaleString("tr-TR")} TRX
                    </span>
                  </div>

                  {results[d.email] ? (
                    <p className="text-sm text-emerald-400">{results[d.email]}</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={customAmounts[d.email] ?? d.claimedAmount}
                        onChange={(e) => setCustom((prev) => ({ ...prev, [d.email]: e.target.value }))}
                        className="w-36 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-amber-500"
                        min="1"
                      />
                      <span className="text-xs text-gray-500">TRX</span>
                      <button
                        onClick={() => confirm(d.email, d.claimedAmount)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Onayla
                      </button>
                      <button
                        onClick={() => setResults((prev) => ({ ...prev, [d.email]: "❌ Reddedildi" }))}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400 text-xs rounded-lg transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
