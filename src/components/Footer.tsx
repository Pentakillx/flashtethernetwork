"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SITE } from "@/lib/site-config";

function FooterScrollButton({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <button
      onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
      className="text-sm text-gray-500 hover:text-white transition-colors"
    >
      {children}
    </button>
  );
}

export function Footer() {
  const { t } = useT();
  const f = t.footer;

  return (
    <footer className="bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-amber-500" />
              <span className="ml-2 text-lg font-bold text-white">
                Flash<span className="text-amber-500">USDT</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-4">{f.product}</h3>
              <ul className="space-y-3">
                <li><FooterScrollButton id="demo">{f.software}</FooterScrollButton></li>
                <li><FooterScrollButton id="packages">{f.licenses}</FooterScrollButton></li>
                <li><FooterScrollButton id="faq">FAQ</FooterScrollButton></li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-4">{f.legal}</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">
                    {f.terms}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">
                    {f.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <p className="text-gray-600 text-sm">{f.copyright(SITE.copyrightYear)}</p>
        </div>
      </div>
    </footer>
  );
}
