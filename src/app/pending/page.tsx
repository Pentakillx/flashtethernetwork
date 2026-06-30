"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, Mail, MessageCircle, ArrowLeft, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

function PendingContent() {
  const params = useSearchParams();
  const type = params.get("type");
  const isNewUser = type === "register";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-16 text-white">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl">

          {/* Header */}
          <div className="bg-gradient-to-br from-amber-500/15 via-amber-500/8 to-transparent border-b border-amber-500/15 px-8 py-10 text-center">
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="absolute w-24 h-24 bg-amber-500/15 rounded-full animate-ping opacity-20" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-full flex items-center justify-center ring-2 ring-amber-500/30">
                <Clock className="w-9 h-9 text-amber-400" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isNewUser ? "Account Created!" : "Welcome Back!"}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              {isNewUser
                ? "Your account has been registered. Our team will review and activate your license shortly."
                : "Your login was successful. Your license is being processed by our team."}
            </p>
          </div>

          {/* Steps */}
          <div className="px-8 py-7 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl">
              <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">License Verification In Progress</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Our team is verifying your payment and preparing your license. This typically takes 5–30 minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">Check Your Email</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Your license key and dashboard access link will be sent to your registered email address.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">Need Help? Contact Support</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Our support team is available 24/7 via live chat, Telegram, or WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.01]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href="https://t.me/your_support_username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </a>
          </div>
        </div>

        <div className="mt-5 text-center flex items-center justify-center gap-2 text-gray-700 text-xs">
          <Zap className="w-3 h-3 text-amber-700" />
          <span>FlashTether NETWORK — Secured &amp; Encrypted</span>
        </div>
      </div>
    </div>
  );
}

export default function PendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <PendingContent />
    </Suspense>
  );
}
