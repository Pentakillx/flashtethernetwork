"use client";

import { useState } from "react";
import { MessageCircle, ChevronDown, Zap, Shield, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useT();
  const s = t.support;
  const f = t.faq;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="bg-[#080810] border-b border-[#1a1a2e] px-6 py-3.5 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">{s.title}</h1>
      </header>

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full">

        {/* Contact card */}
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{s.cardTitle}</h2>
              <p className="text-xs text-slate-500">{s.cardSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-[#0d0d1c] border border-[#1e1e30] rounded-xl p-3 flex flex-col items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{s.availability}</span>
              <span className="text-[10px] text-slate-600">{s.availabilityLabel}</span>
            </div>
            <div className="bg-[#0d0d1c] border border-[#1e1e30] rounded-xl p-3 flex flex-col items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{s.response}</span>
              <span className="text-[10px] text-slate-600">{s.responseLabel}</span>
            </div>
            <div className="bg-[#0d0d1c] border border-[#1e1e30] rounded-xl p-3 flex flex-col items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{s.secure}</span>
              <span className="text-[10px] text-slate-600">{s.secureLabel}</span>
            </div>
          </div>

          <a
            href="https://t.me/FlashTether_Support"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/20 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {s.contactBtn}
          </a>
        </div>

        {/* FAQ */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white mb-1">{s.faqTitle}</h2>
            <p className="text-xs text-slate-500">{s.faqSubtitle}</p>
          </div>

          <div className="space-y-2">
            {f.items.map((item, index) => (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-200 ${
                  openIndex === index
                    ? "border-amber-500/30 bg-amber-500/5"
                    : "border-[#1e1e30] bg-[#111120] hover:border-[#2a2a40]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex justify-between items-center w-full text-left p-4"
                >
                  <h3 className="text-sm font-medium pr-6 text-white">{item.question}</h3>
                  <ChevronDown
                    className={`h-4 w-4 text-amber-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 -mt-1">
                    <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
