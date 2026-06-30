"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Clock } from "lucide-react";
import { loadUserLicenses, getTransactions, buildInitialDeposit, type Tx } from "@/lib/license";
import { useT } from "@/lib/i18n";

type TxType   = "Withdraw" | "Deposit" | "Swap" | "All";
type TxStatus = "Pending" | "Completed" | "Rejected";

const STATUS_STYLE: Record<TxStatus, string> = {
  Pending:   "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Rejected:  "bg-red-500/15 text-red-400 border-red-500/20",
};

export default function HistoryPage() {
  const [all, setAll]         = useState<Tx[]>([]);
  const [filter, setFilter]   = useState<TxType>("All");
  const [search, setSearch]   = useState("");
  const [mounted, setMounted] = useState(false);
  const { t } = useT();
  const h = t.history;

  useEffect(() => {
    const email = localStorage.getItem("cv_user_email") ?? "";
    const { current } = loadUserLicenses(email);
    const stored = getTransactions(email);
    const rows: Tx[] = [];
    if (current) rows.push(buildInitialDeposit(current));
    rows.push(...stored);
    setAll(rows);
    setMounted(true);
  }, []);

  const FILTERS: { key: TxType; label: string }[] = [
    { key: "All",      label: h.filterAll },
    { key: "Withdraw", label: h.filterWithdraw },
    { key: "Deposit",  label: h.filterDeposit },
    { key: "Swap",     label: h.filterSwap },
  ];

  const TYPE_ICON: Record<Exclude<TxType, "All">, React.ReactNode> = {
    Withdraw: <ArrowUpRight  className="w-4 h-4 text-red-400" />,
    Deposit:  <ArrowDownLeft className="w-4 h-4 text-emerald-400" />,
    Swap:     <ArrowLeftRight className="w-4 h-4 text-orange-400" />,
  };

  const visible = all.filter((tx) => {
    const matchType   = filter === "All" || tx.type === filter;
    const matchSearch = tx.address.toLowerCase().includes(search.toLowerCase()) ||
                        tx.amount.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  if (!mounted) return <div className="flex flex-col h-full overflow-y-auto" />;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{h.title}</h1>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-[#111120] border border-[#1e1e30] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1e1e30]">
            <h2 className="font-semibold text-white mb-1">{h.title}</h2>
            <p className="text-xs text-slate-500">{h.subtitle}</p>
          </div>

          <div className="px-5 py-3 border-b border-[#1e1e30] flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={h.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-[#0d0d1c] border border-[#1e1e30] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/30 transition-colors font-mono"
              />
            </div>
            <Filter className="w-4 h-4 text-slate-600 flex-shrink-0" />
            <div className="flex gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    filter === f.key
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                      : "bg-[#0d0d1c] text-slate-500 border-[#1e1e30] hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#1a1a2e]">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Clock className="w-8 h-8 text-slate-700" />
                <p className="text-slate-600 text-sm">{h.empty}</p>
              </div>
            ) : (
              visible.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-[#1e1e30] flex items-center justify-center flex-shrink-0">
                    {TYPE_ICON[tx.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-white">{tx.type}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_STYLE[tx.status as TxStatus]}`}>
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono truncate">
                      {tx.type === "Deposit" ? h.from : h.to}: {tx.address}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-mono font-semibold ${
                      tx.amount.startsWith("+") ? "text-emerald-400" :
                      tx.amount.startsWith("-") ? "text-red-400" : "text-orange-400"
                    }`}>
                      {tx.amount}
                    </p>
                    <p className="text-xs text-slate-600">{tx.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
