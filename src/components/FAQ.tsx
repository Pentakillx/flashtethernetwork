"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useT();
  const f = t.faq;

  return (
    <section id="faq" className="py-14 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            {f.title}
          </h2>
          <p className="text-gray-400 text-sm">{f.subtitle}</p>
        </div>

        <div className="space-y-2">
          {f.items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-200 ${
                openIndex === index
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-gray-800 bg-gray-900/30 hover:border-gray-700"
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
                  <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
