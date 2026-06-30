"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, ArrowUpDown, TrendingDown, Wallet } from "lucide-react";
import { loadUserLicenses, formatUSDT } from "@/lib/license";
import { useT } from "@/lib/i18n";

const COINS = [
  { id: "bitcoin", symbol: "BTC", icon: "₿" },
  { id: "ethereum", symbol: "ETH", icon: "Ξ" },
  { id: "tether", symbol: "USDT", icon: "₮" },
  { id: "binancecoin", symbol: "BNB", icon: "B" },
  { id: "solana", symbol: "SOL", icon: "S" },
  { id: "ripple", symbol: "XRP", icon: "X" },
  { id: "cardano", symbol: "ADA", icon: "A" },
  { id: "dogecoin", symbol: "DOGE", icon: "D" },
  { id: "polkadot", symbol: "DOT", icon: "P" },
  { id: "avalanche-2", symbol: "AVAX", icon: "A" },
];

const FIATS = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "NGN"];

const FIAT_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36,
  AUD: 1.52, CHF: 0.88, CNY: 7.24, INR: 83.2, NGN: 1350,
};

export default function ConverterPage() {
  const [coin, setCoin]         = useState(COINS[0]);
  const [fiat, setFiat]         = useState("USD");
  const [amount, setAmount]     = useState("1");
  const [prices, setPrices]     = useState<Record<string, { usd: number; usd_24h_change: number }>>({});
  const [loading, setLoading]   = useState(false);
  const [usdtBalance, setBalance] = useState(0);
  const { t } = useT();
  const c = t.converter;

  const fetchPrices = useCallback(() => {
    setLoading(true);
    const ids = COINS.map((cn) => cn.id).join(",");
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`)
      .then((r) => r.json())
      .then((d) => setPrices(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPrices();
    const email = localStorage.getItem("cv_user_email") ?? "";
    const { current } = loadUserLicenses(email);
    setBalance(current?.usdtBalance ?? 0);
  }, [fetchPrices]);

  const coinPrice = prices[coin.id]?.usd ?? 0;
  const change24h = prices[coin.id]?.usd_24h_change ?? 0;
  const fiatRate = FIAT_RATES[fiat] ?? 1;
  const converted = coinPrice * fiatRate * parseFloat(amount || "0");
  const up = change24h >= 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{c.title}</h1>
      </header>

      <main className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-xl bg-[#111120] border border-[#1e1e30] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <ArrowUpDown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{c.title}</h2>
              <p className="text-xs text-slate-500">{c.subtitle}</p>
            </div>
          </div>

          {/* Coin selector */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">{c.cryptocurrency}</label>
            <div className="flex flex-wrap gap-2">
              {COINS.map((cn) => (
                <button
                  key={cn.id}
                  onClick={() => setCoin(cn)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    coin.id === cn.id
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "bg-[#0d0d1c] border-[#1e1e30] text-slate-400 hover:text-white hover:border-amber-500/30"
                  }`}
                >
                  {cn.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">
              {c.amount} ({coin.symbol})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="any"
              className="w-full px-4 py-3 bg-[#0d0d1c] border border-[#1e1e30] rounded-xl text-white text-sm font-mono focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          {/* Swap icon */}
          <div className="flex justify-center mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#1e1e30] flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Fiat selector */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">{c.fiatCurrency}</label>
            <div className="flex flex-wrap gap-2">
              {FIATS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiat(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    fiat === f
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "bg-[#0d0d1c] border-[#1e1e30] text-slate-400 hover:text-white hover:border-amber-500/30"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="bg-[#0d0d1c] border border-[#1e1e30] rounded-xl p-5 mb-4">
            <p className="text-xs text-slate-500 mb-1">{c.convertedAmount}</p>
            <p className="text-3xl font-bold text-white tabular-nums font-mono">
              {loading ? "—" : converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-base font-normal text-slate-400 ml-2">{fiat}</span>
            </p>
            {coinPrice > 0 && (
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                1 {coin.symbol} = {(coinPrice * fiatRate).toLocaleString("en-US", { minimumFractionDigits: 2 })} {fiat}
                <span className={`inline-flex items-center gap-0.5 ${up ? "text-emerald-400" : "text-red-400"}`}>
                  {!up && <TrendingDown className="w-3 h-3" />}
                  {change24h.toFixed(2)}% (24h)
                </span>
              </p>
            )}
          </div>

          {/* Wallet balance row */}
          <div className="bg-[#0d0d1c] border border-[#1e1e30] rounded-xl px-5 py-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-500">{c.usdtBalance}</p>
                <p className="text-sm font-bold text-white tabular-nums font-mono">{formatUSDT(usdtBalance)} USDT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">{c.approxIn(fiat)}</p>
              <p className="text-sm font-bold text-amber-400 tabular-nums font-mono">
                {(usdtBalance * (FIAT_RATES[fiat] ?? 1)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <button
            onClick={fetchPrices}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1e1e30] hover:bg-[#2a2a40] text-slate-300 font-medium text-sm rounded-xl transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {c.refreshRates}
          </button>
        </div>
      </main>
    </div>
  );
}
