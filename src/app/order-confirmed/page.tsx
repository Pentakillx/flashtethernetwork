"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Mail, LayoutDashboard, ArrowLeft, Zap } from "lucide-react";

function OrderConfirmedContent() {
  const [params] = [useSearchParams()];
  const router = useRouter();

  const orderId = params.get("oid") ?? "";
  const plan = params.get("plan") ?? "";
  const duration = params.get("dur") ?? "";
  const amount = parseFloat(params.get("amt") ?? "0");
  const crypto = params.get("c") ?? "";
  const chain = params.get("ch") ?? "";
  const email = params.get("e") ?? "";

  const isEmpty = !orderId && !plan && !email;
  const paymentMethod = crypto === "USDT" && chain ? `USDT (${chain.toUpperCase()})` : crypto;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500/15 to-amber-500/10 border-b border-amber-500/20 px-8 py-10 text-center">
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="absolute w-24 h-24 bg-amber-500/20 rounded-full animate-ping opacity-30" />
              <div className="relative w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center ring-2 ring-amber-500/40">
                <CheckCircle className="w-10 h-10 text-amber-400" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-gray-400 text-base">
              Your payment has been verified. Your license is being prepared.
            </p>
          </div>

          <div className="px-8 py-8 space-y-6">
            {/* Order summary */}
            {!isEmpty && (
              <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-700/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order Summary
                  </p>
                </div>
                <div className="divide-y divide-gray-700/40">
                  {orderId && (
                    <OrderRow label="Order ID">
                      <span className="font-mono text-xs text-amber-400 break-all">{orderId}</span>
                    </OrderRow>
                  )}
                  {plan && (
                    <OrderRow label="Plan">
                      <span className="font-semibold text-white capitalize">{plan}</span>
                    </OrderRow>
                  )}
                  {duration && (
                    <OrderRow label="Duration">
                      <span className="font-semibold text-white capitalize">{duration}</span>
                    </OrderRow>
                  )}
                  {amount > 0 && (
                    <OrderRow label="Amount Paid">
                      <span className="font-bold text-amber-400 text-base">
                        ${amount.toLocaleString()}
                      </span>
                    </OrderRow>
                  )}
                  {paymentMethod && (
                    <OrderRow label="Payment Method">
                      <span className="font-semibold text-white">{paymentMethod}</span>
                    </OrderRow>
                  )}
                  {email && (
                    <OrderRow label="Email">
                      <span className="font-semibold text-white break-all">{email}</span>
                    </OrderRow>
                  )}
                </div>
              </div>
            )}

            {/* What happens next */}
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-2">What happens next?</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      Your license key will be sent to{" "}
                      {email ? (
                        <strong className="text-blue-300">{email}</strong>
                      ) : (
                        "your email address"
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      Delivery typically takes 5–15 minutes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      Check your spam folder if you don&apos;t see our email
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      24/7 support available via live chat if you need help
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-900/30"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 px-8 py-4 flex items-center justify-center gap-2 text-gray-600 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>FlashTether NETWORK — Secured &amp; Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <span className="text-sm text-gray-400 shrink-0">{label}</span>
      <span className="text-sm text-right">{children}</span>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
