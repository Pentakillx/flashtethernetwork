"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useT } from "@/lib/i18n";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_rank: number;
}

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    data?: { price: string; price_change_percentage_24h?: { usd: number } };
  };
}

interface GlobalData {
  data?: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_change_percentage_24h_usd: number;
  };
}

function Delta({ val }: { val: number }) {
  const up = val >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs ${up ? "text-emerald-400" : "text-red-400"}`}>
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {Math.abs(val).toFixed(2)}%
    </span>
  );
}

function fmt(n: number) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toFixed(2)}`;
}

export default function MarketPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [global, setGlobal] = useState<GlobalData>({});
  const [fng, setFng] = useState<{ value: string; value_classification: string } | null>(null);
  const { t } = useT();
  const m = t.market;

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
    )
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setCoins(d))
      .catch(() => {});

    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((r) => r.json())
      .then((d) => d?.coins && setTrending(d.coins.slice(0, 8)))
      .catch(() => {});

    fetch("https://api.coingecko.com/api/v3/global")
      .then((r) => r.json())
      .then((d) => setGlobal(d))
      .catch(() => {});

    fetch("https://api.alternative.me/fng/?limit=1")
      .then((r) => r.json())
      .then((d) => d?.data?.[0] && setFng(d.data[0]))
      .catch(() => {});
  }, []);

  const fngValue = fng ? parseInt(fng.value) : 0;
  const fngAngle = fng ? (fngValue / 100) * 180 - 90 : -90;
  const gd = global.data;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{m.title}</h1>
      </header>

      {/* Global stats */}
      <div className="bg-[#0d0d1c] border-b border-[#1a1a2e] px-6 py-2.5 flex items-center gap-6 overflow-x-auto">
        {gd && (
          <>
            <div className="flex items-center gap-2 flex-shrink-0 text-sm">
              <span className="text-slate-500">{m.cryptos}:</span>
              <span className="text-white font-medium">{gd.active_cryptocurrencies.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-sm">
              <span className="text-slate-500">{m.exchanges}:</span>
              <span className="text-white font-medium">{gd.markets}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-sm">
              <span className="text-slate-500">{m.marketCap}:</span>
              <span className="text-white font-medium">{fmt(gd.total_market_cap.usd)}</span>
              <Delta val={gd.market_cap_change_percentage_24h_usd} />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-sm">
              <span className="text-slate-500">{m.vol24h}:</span>
              <span className="text-white font-medium">{fmt(gd.total_volume.usd)}</span>
            </div>
          </>
        )}
        {!gd && <span className="text-xs text-slate-600">{m.loadingGlobal}</span>}
      </div>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar: Fear & Greed + Trending */}
          <div className="col-span-1 space-y-4">
            {/* F&G */}
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4 text-sm">{m.fearGreed}</h3>
              <div className="flex flex-col items-center">
                <svg width="120" height="72" viewBox="0 0 120 72">
                  <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#1e1e30" strokeWidth="12" strokeLinecap="round" />
                  <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="url(#g2)" strokeWidth="12" strokeLinecap="round" strokeDasharray="157" strokeDashoffset={157 - (fngValue / 100) * 157} />
                  <defs>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <line x1="60" y1="62" x2={60 + 38 * Math.cos((fngAngle * Math.PI) / 180)} y2={62 + 38 * Math.sin((fngAngle * Math.PI) / 180)} stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="60" cy="62" r="3" fill="white" />
                </svg>
                <p className="text-2xl font-bold text-white tabular-nums mt-1">{fng?.value ?? "—"}</p>
                <p className="text-sm text-slate-400">{fng?.value_classification ?? m.loadingTrending}</p>
                <p className="text-xs text-slate-600 mt-1">{m.last14Days}</p>
              </div>
            </div>

            {/* Trending */}
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <h3 className="font-semibold text-white text-sm">{m.trendingNow}</h3>
              </div>
              <div className="space-y-3">
                {trending.map((tr, i) => {
                  const pct = tr.item.data?.price_change_percentage_24h?.usd ?? 0;
                  const price = tr.item.data?.price;
                  return (
                    <div key={tr.item.id} className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 w-4 text-right flex-shrink-0">{i + 1}</span>
                      <img src={tr.item.thumb} alt={tr.item.name} className="w-6 h-6 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{tr.item.name}</p>
                        <p className="text-[10px] text-slate-500">{tr.item.symbol}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-white">{price ? `$${parseFloat(price).toFixed(4)}` : "—"}</p>
                        <Delta val={pct} />
                      </div>
                    </div>
                  );
                })}
                {trending.length === 0 && (
                  <p className="text-xs text-slate-600 text-center py-2">{m.loadingTrending}</p>
                )}
              </div>
            </div>
          </div>

          {/* Coin table */}
          <div className="col-span-3 bg-[#111120] border border-[#1e1e30] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1e1e30]">
              <h2 className="font-semibold text-white text-sm">{m.coinTable}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e30]">
                    <th className="text-left px-5 py-3 text-xs font-medium text-slate-500">#</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">{m.coinCol}</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500">{m.priceCol}</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500">1h</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500">24h</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500">7d</th>
                    <th className="text-right px-5 py-3 text-xs font-medium text-slate-500">{m.marketCap}</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((coin) => (
                    <tr key={coin.id} className="border-b border-[#1a1a2e] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-slate-500 text-xs">{coin.market_cap_rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                          <div>
                            <p className="font-medium text-white text-xs">{coin.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase">{coin.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-white text-xs">
                        ${coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-right"><Delta val={coin.price_change_percentage_1h_in_currency ?? 0} /></td>
                      <td className="px-4 py-3 text-right"><Delta val={coin.price_change_percentage_24h} /></td>
                      <td className="px-4 py-3 text-right"><Delta val={coin.price_change_percentage_7d_in_currency ?? 0} /></td>
                      <td className="px-5 py-3 text-right text-slate-400 text-xs font-mono">{fmt(coin.market_cap)}</td>
                    </tr>
                  ))}
                  {coins.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-slate-600 text-sm">
                        {m.loadingMarket}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
