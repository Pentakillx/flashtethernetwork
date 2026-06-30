"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, TrendingUp, Send, Download, ArrowLeftRight,
  Calculator, History, Bell, HelpCircle, Sun, LogOut, Shield,
} from "lucide-react";
import { useT } from "@/lib/i18n";

function getInitials(name: string) {
  return name
    .split(/[\s@._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { t, lang, setLang } = useT();
  const s = t.sidebar;

  useEffect(() => {
    setUserName(localStorage.getItem("cv_user_name") ?? "User");
    setUserEmail(localStorage.getItem("cv_user_email") ?? "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cv_user_name");
    localStorage.removeItem("cv_user_email");
    router.push("/login");
  };

  const isActive = (href: string, exact = false) => {
    if (exact) return path === href;
    return path.startsWith(href);
  };

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  const MAIN_NAV = [
    { href: "/software",         label: s.dashboard,     icon: LayoutDashboard, exact: true },
    { href: "/software/market",  label: s.market,        icon: TrendingUp },
    { href: "/software/send",    label: s.send,          icon: Send },
    { href: "/software/receive", label: s.receive,       icon: Download },
    { href: "/software/swap",    label: s.swap,          icon: ArrowLeftRight },
  ];

  const TOOLS_NAV = [
    { href: "/software/converter",     label: s.converter,     icon: Calculator },
    { href: "/software/history",       label: s.history,       icon: History },
    { href: "/software/notifications", label: s.notifications, icon: Bell },
    { href: "/software/support",       label: s.support,       icon: HelpCircle },
  ];

  return (
    <aside className="w-60 flex-shrink-0 bg-[#0d0d1c] border-r border-[#1a1a2e] flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-[#1a1a2e]">
        <Link href="/software" className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-black tracking-tight text-white leading-none">
            Flash<span className="text-amber-400">Tether</span>{" "}
            <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">Network</span>
          </span>
        </Link>
      </div>

      {/* User info */}
      {userEmail && (
        <div className="px-4 py-3 border-b border-[#1a1a2e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/25 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0">
              {getInitials(userName)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav className="px-3 pt-4 pb-2">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-2 mb-2">{s.main}</p>
        <ul className="space-y-0.5">
          {MAIN_NAV.map(({ href, label, icon: Icon, exact }) => (
            <li key={href}>
              <Link href={href} className={linkClass(isActive(href, exact))}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tools nav */}
      <nav className="px-3 pt-2 pb-2">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-2 mb-2">{s.tools}</p>
        <ul className="space-y-0.5">
          {TOOLS_NAV.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={linkClass(isActive(href))}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="mt-auto px-3 pb-5 pt-4 border-t border-[#1a1a2e] space-y-0.5">
        {/* Lang toggle */}
        <div className="flex items-center gap-1 px-3 py-2 mb-1">
          <button
            onClick={() => setLang("en")}
            className={`flex-1 py-1 rounded text-xs font-semibold transition-all ${
              lang === "en" ? "bg-amber-500/20 text-amber-400" : "text-slate-500 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("tr")}
            className={`flex-1 py-1 rounded text-xs font-semibold transition-all ${
              lang === "tr" ? "bg-amber-500/20 text-amber-400" : "text-slate-500 hover:text-white"
            }`}
          >
            TR
          </button>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-amber-400 hover:text-amber-300 hover:bg-amber-500/5 w-full transition-all"
        >
          <Shield className="w-4 h-4" />
          {s.myLicense}
        </Link>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 w-full transition-all">
          <Sun className="w-4 h-4" />
          {s.lightMode}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 w-full transition-all"
        >
          <LogOut className="w-4 h-4" />
          {s.logout}
        </button>
      </div>
    </aside>
  );
}
