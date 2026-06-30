"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Copy, ExternalLink, Send, Download, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { loadUserLicenses, formatUSDT } from "@/lib/license";

/* ── Types ── */
interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
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

interface Wallet {
  id: string;
  name: string;
  symbol: string;
  network: string;
  balance: string;
  usd: string;
  address: string;
  color: string;
}

const WALLET_TEMPLATES: Omit<Wallet, "balance" | "usd">[] = [
  { id: "usdt-trc20",   name: "USDT TRC20",      symbol: "USDT", network: "TETHER",       address: "TW7Ba9U7QJYmUD7nXG5wVnULtrnt2ubiWV", color: "#26a17b" },
  { id: "trx",          name: "TRX",              symbol: "TRX",  network: "TRON",         address: "TYYRiCe9Vf3mno8zxPL22dsf9aBC1kWqX", color: "#ef0027" },
  { id: "btc",          name: "BTC",              symbol: "BTC",  network: "BITCOIN",      address: "bc1qe6s8zf...jfagh0ynng",            color: "#f7931a" },
  { id: "bch",          name: "BCH",              symbol: "BCH",  network: "BITCOIN-CASH", address: "bitcoincash:qp...3kf",               color: "#0ac18e" },
  { id: "eth",          name: "ETH",              symbol: "ETH",  network: "ETHEREUM",     address: "0x742d35Cc66...9F1B",                color: "#627eea" },
  { id: "bnb-smart",    name: "BNB Smartchain",   symbol: "BNB",  network: "BINANCE-COIN", address: "0xB8c7...3Aab",                      color: "#f3ba2f" },
  { id: "bnb-beacon",   name: "BNB Beacon",       symbol: "BNB",  network: "BINANCE-COIN", address: "bnb1hj5fv...rr2",                    color: "#f3ba2f" },
  { id: "usdt-erc20",   name: "USDT ERC20",       symbol: "USDT", network: "TETHER",       address: "0x742d35...9F1B",                    color: "#26a17b" },
  { id: "ltc",          name: "LTC",              symbol: "LTC",  network: "LITECOIN",     address: "ltc1qy...p9",                        color: "#bfbbbb" },
  { id: "xrp",          name: "XRP",              symbol: "XRP",  network: "XRP",          address: "r4sJw...1K7",                        color: "#006097" },
];

const TICKER_COINS = ["bitcoin", "ethereum", "tether", "binancecoin", "usd-coin", "ripple", "solana", "tron"];

function buildWallets(usdtBalance: number): Wallet[] {
  return WALLET_TEMPLATES.map((t) => {
    if (t.id === "usdt-trc20") {
      const balStr = usdtBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return { ...t, balance: balStr, usd: `$${formatUSDT(usdtBalance)} USD` };
    }
    return { ...t, balance: "0.00", usd: "0 USD" };
  });
}

function PriceChange({ val }: { val: number }) {
  const up = val >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {Math.abs(val).toFixed(1)}%
    </span>
  );
}

function WalletIcon({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: color + "33", border: `1.5px solid ${color}55`, color }}
    >
      {symbol.slice(0, 3)}
    </div>
  );
}

function AllocationDonut({ items }: { items: { label: string; pct: number; color: string }[] }) {
  let offset = 0;
  const r = 36;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <svg width="88" height="88" viewBox="0 0 88 88">
        {items.map((item, i) => {
          const dash = (item.pct / 100) * circumference;
          const gap = circumference - dash;
          const rotate = (offset / 100) * 360 - 90;
          offset += item.pct;
          return (
            <circle key={i} cx="44" cy="44" r={r} fill="none"
              stroke={item.color} strokeWidth="10"
              strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${rotate} 44 44)`}
            />
          );
        })}
      </svg>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SoftwareDashboardPage() {
  const [coins, setCoins]               = useState<CoinPrice[]>([]);
  const [trending, setTrending]         = useState<TrendingCoin[]>([]);
  const [fng, setFng]                   = useState<{ value: string; value_classification: string } | null>(null);
  const [usdtBalance, setUsdtBalance]   = useState(0);
  const [wallets, setWallets]           = useState<Wallet[]>(buildWallets(0));
  const [selectedWallet, setSelected]   = useState<Wallet>(buildWallets(0)[0]);
  const [copied, setCopied]             = useState(false);
  const [userName, setUserName]         = useState("User");
  const [userEmail, setUserEmail]       = useState("");

  useEffect(() => {
    const em   = localStorage.getItem("cv_user_email") ?? "";
    const name = localStorage.getItem("cv_user_name")  ?? "User";
    setUserName(name);
    setUserEmail(em);

    // Load USDT balance from active license
    const { current } = loadUserLicenses(em);
    const bal = current?.usdtBalance ?? 0;
    setUsdtBalance(bal);
    const built = buildWallets(bal);
    setWallets(built);
    setSelected(built[0]);
  }, []);

  useEffect(() => {
    const ids = TICKER_COINS.join(",");
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=8&sparkline=false&price_change_percentage=24h`)
      .then((r) => r.json()).then((d) => Array.isArray(d) && setCoins(d)).catch(() => {});
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((r) => r.json()).then((d) => d?.coins && setTrending(d.coins.slice(0, 8))).catch(() => {});
    fetch("https://api.alternative.me/fng/?limit=1")
      .then((r) => r.json()).then((d) => d?.data?.[0] && setFng(d.data[0])).catch(() => {});
  }, []);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  // When wallet is selected from list, keep it updated
  const selectWallet = (w: Wallet) => setSelected(w);

  const fngValue = fng ? parseInt(fng.value) : 0;
  const fngAngle = fng ? (fngValue / 100) * 180 - 90 : -90;

  const portfolioStr = `$${formatUSDT(usdtBalance)}`;

  return (
    <div className="flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link href="/software/notifications" className="relative">
            <div className="w-8 h-8 rounded-full bg-[#111120] border border-[#1e1e30] flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">9+</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111120] border border-[#1e1e30]">
            <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-[11px] font-bold text-white">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm text-slate-300 max-w-[140px] truncate">{userEmail || userName}</span>
          </div>
        </div>
      </header>

      {/* Price ticker */}
      <div className="bg-[#0d0d1c] border-b border-[#1a1a2e] overflow-hidden">
        <div className="flex gap-0 animate-marquee" style={{ width: "max-content" }}>
          {[...coins, ...coins].map((coin, i) => (
            <Link key={i} href="/software/market"
              className="flex items-center gap-2 px-5 py-2.5 border-r border-[#1a1a2e] hover:bg-white/5 transition-colors flex-shrink-0"
            >
              {coin.image && <img src={coin.image} alt={coin.symbol} className="w-4 h-4 rounded-full" />}
              <span className="text-xs font-semibold text-white uppercase">{coin.symbol}</span>
              <PriceChange val={coin.price_change_percentage_24h} />
              <span className="text-xs text-slate-400">${coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-500">Total Portfolio</span>
            </div>
            <p className="text-xl font-bold text-white tabular-nums">{portfolioStr}</p>
            <p className="text-xs text-slate-500 mt-0.5">USD value across all wallets</p>
          </div>

          <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs text-slate-500">System Activity</span>
            </div>
            <p className="text-xl font-bold text-white">16</p>
            <p className="text-xs text-slate-500 mt-0.5">Cryptocurrencies</p>
          </div>

          <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-500">Highest Value</span>
            </div>
            <p className="text-xl font-bold text-white">USDT TRC20</p>
            <p className="text-xs text-slate-500 mt-0.5">${formatUSDT(usdtBalance)}</p>
          </div>

          <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              </svg>
              <span className="text-xs text-slate-500">Allocation</span>
            </div>
            <AllocationDonut items={[
              { label: "USDT TRC20", pct: 100, color: "#26a17b" },
            ]} />
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Wallet list */}
          <div className="col-span-2 bg-[#111120] border border-[#1e1e30] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e1e30]">
              <h2 className="font-semibold text-white">Crypto</h2>
              <span className="text-xs text-slate-500">{wallets.length} Cryptocurrencies</span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 max-h-[480px] overflow-y-auto">
              {wallets.map((w) => (
                <button
                  key={w.id}
                  onClick={() => selectWallet(w)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    selectedWallet.id === w.id
                      ? "border-amber-500/30 bg-amber-500/10"
                      : "border-[#1e1e30] bg-[#0d0d1c] hover:border-[#2a2a3e]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <WalletIcon symbol={w.symbol} color={w.color} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{w.name}</p>
                      <p className="text-xs text-slate-500 truncate">{w.network}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-sm font-bold text-white tabular-nums">{w.balance}</p>
                    <p className="text-xs text-slate-500">{w.usd}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Wallet details */}
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-5">
              <h2 className="font-semibold text-white mb-4">Wallet Details</h2>
              <div className="flex items-center gap-3 mb-4">
                <WalletIcon symbol={selectedWallet.symbol} color={selectedWallet.color} />
                <div>
                  <h3 className="font-bold text-white">{selectedWallet.name}</h3>
                  <p className="text-xs text-slate-500 uppercase">{selectedWallet.network}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-xs text-slate-500">Balance</p>
                <p className="text-xl font-bold text-white tabular-nums">
                  {selectedWallet.balance}{" "}
                  <span className="text-sm font-normal text-slate-400">{selectedWallet.symbol}</span>
                </p>
                <p className="text-sm font-semibold text-amber-400">{selectedWallet.usd}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-1">Wallet Address</p>
                <div className="flex items-center gap-2 bg-[#0d0d1c] border border-[#1e1e30] rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-300 flex-1 truncate">{selectedWallet.address}</code>
                  <button onClick={() => copy(selectedWallet.address)} className="flex-shrink-0 text-slate-500 hover:text-white transition-colors">
                    {copied
                      ? <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      : <Copy className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/software/send" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition-colors">
                  <Send className="w-3.5 h-3.5" /> Send
                </Link>
                <Link href="/software/receive" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#1e1e30] hover:bg-[#2a2a40] text-white text-xs font-semibold rounded-lg transition-colors">
                  <Download className="w-3.5 h-3.5" /> Receive
                </Link>
                <Link href="/software/swap" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#1e1e30] hover:bg-[#2a2a40] text-white text-xs font-semibold rounded-lg transition-colors">
                  <ArrowLeftRight className="w-3.5 h-3.5" /> Swap
                </Link>
              </div>
            </div>

            {/* Fear & Greed */}
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4">Fear &amp; Greed Index</h3>
              <div className="flex flex-col items-center">
                <svg width="120" height="72" viewBox="0 0 120 72">
                  <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#1e1e30" strokeWidth="12" strokeLinecap="round" />
                  <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="url(#fngGrad)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray="157" strokeDashoffset={fng ? 157 - (fngValue / 100) * 157 : 157} />
                  <defs>
                    <linearGradient id="fngGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <line x1="60" y1="62"
                    x2={60 + 38 * Math.cos((fngAngle * Math.PI) / 180)}
                    y2={62 + 38 * Math.sin((fngAngle * Math.PI) / 180)}
                    stroke="white" strokeWidth="2" strokeLinecap="round"
                  />
                  <circle cx="60" cy="62" r="3" fill="white" />
                </svg>
                <p className="text-2xl font-bold text-white tabular-nums mt-1">{fng?.value ?? "—"}</p>
                <p className="text-sm text-slate-400">{fng?.value_classification ?? "Loading..."}</p>
                <p className="text-xs text-slate-600 mt-1">Last 14 days</p>
              </div>
            </div>

            {/* Trending */}
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <h3 className="font-semibold text-white">Trending Now</h3>
              </div>
              <div className="space-y-2">
                {trending.slice(0, 5).map((t, i) => {
                  const pct = t.item.data?.price_change_percentage_24h?.usd ?? 0;
                  const price = t.item.data?.price ?? "—";
                  return (
                    <div key={t.item.id} className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-600 w-4 text-right">{i + 1}</span>
                      <img src={t.item.thumb} alt={t.item.name} className="w-5 h-5 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{t.item.name}</p>
                        <p className="text-[10px] text-slate-500">{t.item.symbol}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-white">{typeof price === "string" ? price : `$${parseFloat(price).toFixed(4)}`}</p>
                        <PriceChange val={pct} />
                      </div>
                    </div>
                  );
                })}
                {trending.length === 0 && <p className="text-xs text-slate-600 text-center py-2">Loading...</p>}
              </div>
              <Link href="/software/market" className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-3 transition-colors">
                View all on Market <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
