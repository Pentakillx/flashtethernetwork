"use client";

import { Bell } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function NotificationsPage() {
  const { t } = useT();
  const n = t.notifications;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{n.title}</h1>
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#111120] border border-[#1e1e30] flex items-center justify-center mx-auto mb-4">
            <Bell className="w-7 h-7 text-slate-600" />
          </div>
          <p className="text-white font-semibold mb-1">{n.empty}</p>
        </div>
      </main>
    </div>
  );
}
