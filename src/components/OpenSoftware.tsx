"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard, TrendingUp, Send, ArrowLeftRight,
  Calculator, History, Zap, Shield, Globe,
} from "lucide-react";

const FEATURES = [
  { icon: LayoutDashboard, label: "Live Dashboard", desc: "Real-time portfolio overview with multi-wallet support" },
  { icon: TrendingUp, label: "Market Data", desc: "Live prices for 30+ cryptocurrencies via CoinGecko" },
  { icon: Send, label: "Send & Receive", desc: "Transfer assets to any on-chain address" },
  { icon: ArrowLeftRight, label: "Instant Swap", desc: "Exchange between your wallets in one click" },
  { icon: Calculator, label: "Price Converter", desc: "Convert crypto to 10+ fiat currencies in real-time" },
  { icon: History, label: "Transaction History", desc: "Full history with search and filter by type" },
];

const NAV_LABELS = ["Dashboard", "Market", "Send", "Swap", "Converter", "History"];

const BASE_WALLETS = [
  { name: "USDT TRC20", symbol: "USDT", baseBalance: 750,    color: "#26a17b" },
  { name: "TRX",        symbol: "TRX",  baseBalance: 0,      color: "#ef0027" },
  { name: "BTC",        symbol: "BTC",  baseBalance: 0,      color: "#f7931a" },
  { name: "ETH",        symbol: "ETH",  baseBalance: 0,      color: "#627eea" },
];

const BASE_TRENDING = ["Bitcoin", "Ethereum", "Solana", "XRP"];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function fmtNumber(n: number, decimals = 2) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function OpenSoftware() {
  const [portfolio, setPortfolio]   = useState(750.00);
  const [walletUsd, setWalletUsd]   = useState([750.00, 0, 0, 0]);
  const [trending, setTrending]     = useState([2.41, 1.87, 5.62, 3.14]);
  const [tick, setTick]             = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPortfolio(p => p * (1 + rand(-0.0004, 0.0006)));
      setWalletUsd(prev => prev.map(v => v * (1 + rand(-0.0008, 0.001))));
      setTrending(prev => prev.map(v => parseFloat((v + rand(-0.3, 0.4)).toFixed(2))));
      setTick(t => t + 1);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const activeNav = tick % NAV_LABELS.length;

  return (
    <section id="open-software" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-medium mb-5">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Open Software
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Professional Crypto</span>{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Exchange Dashboard
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-sm leading-relaxed">
            A fully-featured crypto wallet dashboard with real-time market data,
            multi-wallet management, and complete transaction tools.
          </p>
        </div>

        {/* Dashboard preview window */}
        <div className="bg-[#0d0d1c] border border-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/5 mb-14">
          {/* Title bar */}
          <div className="bg-[#080810] border-b border-[#1a1a2e] px-5 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="text-base">⚡</span>
              <span className="text-sm font-black tracking-tight text-gray-300">
                Flash<span className="text-amber-400">Tether</span>{" "}
                <span className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase">Network</span>
              </span>
            </div>
            {/* Static nav labels — no links */}
            <div className="flex items-center gap-1.5 ml-auto">
              {NAV_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors duration-700 ${
                    i === activeNav
                      ? "bg-amber-500/15 text-amber-400"
                      : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 grid grid-cols-4 gap-4">
            {/* Stats row */}
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Total Portfolio</p>
              <p className="text-base font-bold text-amber-400 tabular-nums transition-all duration-700">
                ${fmtNumber(portfolio)}
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5">USD across all wallets</p>
            </div>
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">System Activity</p>
              <p className="text-base font-bold text-orange-400">16</p>
              <p className="text-[11px] text-gray-600 mt-0.5">Cryptocurrencies</p>
            </div>
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Highest Value</p>
              <p className="text-base font-bold text-emerald-400">USDT TRC20</p>
              <p className="text-[11px] text-gray-600 mt-0.5">${fmtNumber(walletUsd[0])}</p>
            </div>
            <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Allocation</p>
              <p className="text-base font-bold text-amber-400">
                {((walletUsd[0] / portfolio) * 100).toFixed(1)}%
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5">USDT TRC20</p>
            </div>

            {/* Wallet list */}
            <div className="col-span-2 bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
              <p className="text-xs font-semibold text-white mb-3 flex items-center justify-between">
                Crypto <span className="text-gray-600 font-normal">16 Wallets</span>
              </p>
              <div className="space-y-2.5">
                {BASE_WALLETS.map((w, i) => (
                  <div key={w.symbol} className="flex items-center justify-between p-2.5 bg-[#0d0d1c] border border-[#1a1a2e] rounded-lg">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ backgroundColor: w.color + "22", color: w.color, border: `1px solid ${w.color}44` }}
                      >
                        {w.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{w.name}</p>
                        <p className="text-[9px] text-gray-600">{w.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white font-mono tabular-nums">{fmtNumber(w.baseBalance, w.baseBalance < 10 ? 4 : 2)}</p>
                      <p className="text-[9px] text-gray-600 tabular-nums transition-all duration-700">${fmtNumber(walletUsd[i])}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="col-span-2 space-y-4">
              <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
                <p className="text-xs font-semibold text-white mb-2">Wallet Details</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Balance</span>
                    <span className="text-white font-mono tabular-nums">{fmtNumber(BASE_WALLETS[0].baseBalance)} USDT</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">USD Value</span>
                    <span className="text-amber-400 font-semibold tabular-nums transition-all duration-700">
                      ${fmtNumber(walletUsd[0])}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <div className="flex-1 py-1.5 bg-amber-500 rounded-lg text-center text-[10px] font-semibold text-white">Send</div>
                    <div className="flex-1 py-1.5 bg-[#1e1e30] rounded-lg text-center text-[10px] font-semibold text-gray-400">Receive</div>
                    <div className="flex-1 py-1.5 bg-[#1e1e30] rounded-lg text-center text-[10px] font-semibold text-gray-400">Swap</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111120] border border-[#1e1e30] rounded-xl p-4">
                <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-orange-400" /> Trending Now
                </p>
                {BASE_TRENDING.map((name, i) => (
                  <div key={name} className="flex items-center justify-between py-1.5 border-b border-[#1a1a2e] last:border-0">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-gray-700 w-3 text-right">{i + 1}</span>
                      <span className="text-gray-300">{name}</span>
                    </div>
                    <span className={`text-[10px] tabular-nums transition-all duration-700 ${trending[i] >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {trending[i] >= 0 ? "+" : ""}{trending[i].toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="border-t border-[#1a1a2e] bg-[#080810] px-6 py-3 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-gray-600">Live</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-600">
              <Shield className="w-3 h-3 text-amber-400" />
              Secure Platform
              <span className="text-gray-700">•</span>
              <Globe className="w-3 h-3 text-emerald-400" />
              Real-time Data
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-amber-500/25 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/25 transition-colors">
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
