"use client";

import { useState, useEffect } from "react";
import { Download, Copy, Check, AlertTriangle, Zap, CheckCircle, Clock } from "lucide-react";
import { getTrxBalance, setTrxBalance, TRX_REQUIRED } from "@/lib/license";
import { useT } from "@/lib/i18n";

const WALLETS = [
  { id: "usdt-trc20",     label: "USDT TRC20 (Tron)",             address: "TAdnG4GgWBbUZ1jfL966DWwm8PAqnADKAm" },
  { id: "usdt-erc20",     label: "USDT ERC20 (Ethereum)",         address: "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15" },
  { id: "usdt-bep20",     label: "USDT BEP20 (BSC)",              address: "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15" },
  { id: "usdt-polygon",   label: "USDT Polygon",                  address: "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15" },
  { id: "usdt-avalanche", label: "USDT Avalanche (Avax C-Chain)", address: "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15" },
  { id: "btc",            label: "BTC (Bitcoin)",                 address: "bc1qln48c9k86x5a3y9mk5nq8eudz8l8es8520q5ch" },
  { id: "eth",            label: "ETH (Ethereum ERC20)",          address: "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15" },
  { id: "bnb",            label: "BNB (BSC BEP20)",               address: "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15" },
  { id: "trx",            label: "TRX (Tron TRC20)",              address: "TAdnG4GgWBbUZ1jfL966DWwm8PAqnADKAm" },
];

export default function ReceivePage() {
  const [selected, setSelected]   = useState(WALLETS[0]);
  const [copied, setCopied]       = useState(false);
  const [email, setEmail]         = useState("");
  const [trxBalance, setTrxBal]   = useState(0);
  const [trxInput, setTrxInput]   = useState("");
  const [trxSuccess, setTrxSucc]  = useState("");
  const [trxPending, setTrxPend]  = useState(false);
  const [mounted, setMounted]     = useState(false);
  const { t } = useT();
  const r = t.receive;

  useEffect(() => {
    const em = localStorage.getItem("cv_user_email") ?? "";
    setEmail(em);
    setTrxBal(getTrxBalance(em));
    setMounted(true);
  }, []);

  const isTrx = selected.id === "trx";
  const trxOk = trxBalance >= TRX_REQUIRED;

  const copy = () => {
    navigator.clipboard.writeText(selected.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleConfirmDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(trxInput);
    if (!amount || amount <= 0 || !email) return;
    setTrxPend(true);
    try {
      await fetch("/api/trx-deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount }),
      });
    } catch {}
    setTrxInput("");
    setTrxPend(false);
    setTrxSucc("pending");
    setTimeout(() => setTrxSucc(""), 8000);
  };

  if (!mounted) return <div className="flex flex-col h-full overflow-y-auto" />;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{r.title}</h1>
      </header>

      <main className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-lg space-y-4">

          {/* Main card */}
          <div className="bg-[#111120] border border-[#1e1e30] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{r.title}</h2>
                <p className="text-xs text-slate-500">{r.subtitle}</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Wallet selector */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{r.selectWallet}</label>
                <select
                  value={selected.id}
                  onChange={(e) => {
                    setSelected(WALLETS.find((w) => w.id === e.target.value) ?? WALLETS[0]);
                    setTrxSucc("");
                  }}
                  className="w-full px-4 py-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/60 transition-colors"
                >
                  {WALLETS.map((w) => (
                    <option key={w.id} value={w.id} className="bg-[#0d0d1c]">{w.label}</option>
                  ))}
                </select>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center py-6">
                <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center mb-3">
                  <svg viewBox="0 0 100 100" className="w-32 h-32">
                    {[0,1,2,3,4,5,6].flatMap((row) =>
                      [0,1,2,3,4,5,6].map((col) => {
                        const corner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
                        const seed = (row * 7 + col + selected.id.charCodeAt(0)) % 2;
                        const fill = corner ? "#000" : seed === 0 ? "#000" : "transparent";
                        return <rect key={`${row}-${col}`} x={col * 13 + 3} y={row * 13 + 3} width="11" height="11" fill={fill} rx="1" />;
                      })
                    )}
                  </svg>
                </div>
                <p className="text-xs text-slate-500">{r.scanQr}</p>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">{r.walletAddress}</label>
                  {isTrx && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      trxOk
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                    }`}>
                      {trxOk ? r.trxLoaded(trxBalance) : r.trxRequired(TRX_REQUIRED)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl px-4 py-3">
                  <code className="flex-1 text-xs text-slate-300 break-all font-mono">{selected.address}</code>
                  <button onClick={copy} className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* TRX-specific info */}
              {isTrx && (
                <div className="bg-amber-500/5 border border-amber-500/25 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-300 mb-1">{r.trxSystemTitle}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {r.trxSystemBody(TRX_REQUIRED)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#0d0d1c] rounded-lg px-3 py-2.5 border border-amber-500/15">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs text-slate-400">{r.trxMinDeposit}</span>
                    </div>
                    <span className="text-sm font-bold text-amber-300 tabular-nums">{TRX_REQUIRED.toLocaleString()} TRX</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0d0d1c] rounded-lg px-3 py-2.5 border border-[#1e1e30]">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 flex items-center justify-center text-slate-500 text-[10px] font-bold">₮</span>
                      <span className="text-xs text-slate-400">{r.trxCurrentBalance}</span>
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${trxOk ? "text-emerald-400" : "text-slate-500"}`}>
                      {trxBalance.toLocaleString()} TRX
                    </span>
                  </div>
                </div>
              )}

              {/* Copy button */}
              <button
                onClick={copy}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all"
              >
                {copied
                  ? <><Check className="w-4 h-4" /> {r.copied}</>
                  : <><Copy className="w-4 h-4" /> {r.copyAddress}</>
                }
              </button>
            </div>
          </div>

          {/* TRX confirm deposit card */}
          {isTrx && (
            <div className="bg-[#111120] border border-[#1e1e30] rounded-2xl p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{r.trxDepositTitle}</p>
              <form onSubmit={handleConfirmDeposit} className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    value={trxInput}
                    onChange={(e) => setTrxInput(e.target.value)}
                    placeholder={r.trxDepositPlaceholder(TRX_REQUIRED)}
                    min="1"
                    step="any"
                    className="w-full px-4 py-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm font-mono transition-colors"
                  />
                </div>
                {trxSuccess === "pending" && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2.5 space-y-1">
                    <p className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      Bildiriminiz alındı — Admin onayı bekleniyor
                    </p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Admin yatırımı doğruladıktan sonra bakiyeniz otomatik olarak güncellenecektir.
                      Onay sonrası dashboard sayfasını yenileyin.
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!trxInput || parseFloat(trxInput) <= 0 || trxPending}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-sm"
                >
                  {trxPending
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Gönderiliyor...</>
                    : <><Zap className="w-4 h-4" /> {r.trxDepositBtn}</>
                  }
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
