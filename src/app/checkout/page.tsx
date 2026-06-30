"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Mail,
  Wallet,
  CheckCircle,
  XCircle,
  Copy,
  Check,
  Shield,
  ArrowLeft,
  Clock,
  AlertCircle,
  Loader,
} from "lucide-react";
import { PRICES, CRYPTO_ADDRESSES, CRYPTO_RATES, PAYMENT } from "@/lib/site-config";

const CRYPTOS = ["BTC", "ETH", "BNB", "TRX", "USDT"] as const;
type Crypto = (typeof CRYPTOS)[number];

const USDT_CHAINS = ["ERC20", "BEP20", "TRC20", "Polygon", "Avalanche"] as const;
type UsdtChain = (typeof USDT_CHAINS)[number];

type Step = "contact" | "payment";

const STEP_ICONS = [
  { id: "contact" as Step, label: "Contact Info", Icon: Mail },
  { id: "payment" as Step, label: "Payment", Icon: Wallet },
  { id: "verify" as const, label: "Verify", Icon: CheckCircle },
];

function StepIndicator({ currentStep }: { currentStep: Step | "verify" }) {
  const currentIdx = STEP_ICONS.findIndex((s) => s.id === currentStep);
  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <div className="relative flex items-center justify-between">
        {STEP_ICONS.map(({ id, label, Icon }, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={id} className="contents">
              <div className="relative flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    done
                      ? "bg-green-500 shadow-md shadow-green-500/30"
                      : active
                      ? "bg-green-500 shadow-md shadow-green-500/40 ring-2 ring-green-500/20"
                      : "bg-gray-800 border border-gray-700"
                  }`}
                >
                  {done ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-gray-500"}`} />
                  )}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium ${done || active ? "text-white" : "text-gray-500"}`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_ICONS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative" style={{ top: "-12px" }}>
                  <div className="absolute inset-0 bg-gray-800 rounded-full" />
                  <div
                    className={`absolute inset-0 bg-green-500 rounded-full transition-all duration-500 ${i < currentIdx ? "w-full" : "w-0"}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planKey = searchParams.get("plan") ?? "basic";
  const duration = searchParams.get("duration") ?? "1 day";
  const amount = PRICES[planKey]?.[duration] ?? 0;

  const [step, setStep] = useState<Step>("contact");
  const [email, setEmail] = useState("");
  const [phoneOrTelegram, setPhoneOrTelegram] = useState("");
  const [contactError, setContactError] = useState("");

  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>("USDT");
  const [selectedChain, setSelectedChain] = useState<UsdtChain>("TRC20");
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(PAYMENT.windowSeconds);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [expired, setExpired] = useState(false);

  const getAddress = useCallback(() => {
    if (selectedCrypto === "USDT") return CRYPTO_ADDRESSES[`USDT-${selectedChain}`] ?? "";
    return CRYPTO_ADDRESSES[selectedCrypto] ?? "";
  }, [selectedCrypto, selectedChain]);

  const getCryptoAmount = useCallback(() => {
    const rate = CRYPTO_RATES[selectedCrypto];
    if (!rate) return 0;
    const raw = amount / rate;
    const decimals = selectedCrypto === "BTC" ? 8 : selectedCrypto === "ETH" ? 6 : 2;
    return parseFloat(raw.toFixed(decimals));
  }, [amount, selectedCrypto]);

  useEffect(() => {
    if (step !== "payment" || expired || verified) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, expired, verified]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleContinue = () => {
    if (!email.includes("@") || !phoneOrTelegram.trim()) {
      setContactError("Please fill in both fields.");
      return;
    }
    setContactError("");
    setStep("payment");
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(String(getCryptoAmount()));
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(getAddress());
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleVerify = async () => {
    setVerifying(true);
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const chain = selectedCrypto === "USDT" ? selectedChain : "";

    // Telegram bildirimi — hata olsa bile kullanıcı akışını durdurmaz
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        plan: planKey,
        duration,
        amount,
        email,
        phone: phoneOrTelegram,
        crypto: selectedCrypto,
        chain,
        address: getAddress(),
      }),
    }).catch(() => {/* sessizce geç */});

    await new Promise((r) => setTimeout(r, 1500));
    router.push(
      `/order-confirmed?oid=${orderId}&plan=${planKey}&dur=${encodeURIComponent(duration)}&amt=${amount}&c=${selectedCrypto}&ch=${chain}&e=${encodeURIComponent(email)}`
    );
  };

  const planLabel =
    planKey.charAt(0).toUpperCase() + planKey.slice(1) + " — " + duration;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pt-16 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back */}
        <button
          onClick={() => (step === "payment" ? setStep("contact") : router.push("/#packages"))}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {step === "payment" ? "Back to Contact" : "Back to Plans"}
        </button>

        {/* Order info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Complete Your Order</h1>
          <p className="text-gray-400 text-sm">
            {planLabel} — <span className="text-green-400 font-semibold">${amount}</span>
          </p>
        </div>

        <StepIndicator currentStep={step} />

        {/* Step: Contact */}
        {step === "contact" && (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Contact Information</h2>
                <p className="text-xs text-gray-400">We&apos;ll send your license details here</p>
              </div>
            </div>

            {contactError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-300 text-xs">
                {contactError}
              </div>
            )}

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  WhatsApp or Telegram *
                </label>
                <input
                  type="text"
                  value={phoneOrTelegram}
                  onChange={(e) => setPhoneOrTelegram(e.target.value)}
                  placeholder="+1234567890 or @username"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 transition-all text-sm"
                />
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300">
                  Your information is encrypted and secure. We&apos;ll use this to deliver your
                  license and provide support.
                </p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!email.includes("@") || !phoneOrTelegram.trim()}
              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border disabled:border-gray-700/50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.01]"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 shadow-xl space-y-5">
            {/* Timer */}
            {!expired && !verified && (
              <div className="flex items-center justify-between px-4 py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-orange-300 text-sm">
                  <Clock className="w-4 h-4" />
                  Payment window
                </div>
                <span
                  className={`font-mono font-bold text-sm ${timeRemaining < 60 ? "text-red-400" : "text-orange-300"}`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}

            {expired && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-semibold text-sm">Payment window expired</p>
                  <p className="text-red-400/70 text-xs">Please go back and start a new order.</p>
                </div>
              </div>
            )}

            {/* Crypto selector */}
            <div>
              <p className="text-xs font-medium text-gray-400 mb-2">Select cryptocurrency</p>
              <div className="flex flex-wrap gap-2">
                {CRYPTOS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCrypto(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      selectedCrypto === c
                        ? "bg-green-500/20 border-green-500/60 text-green-300"
                        : "bg-gray-800/60 border-gray-700/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* USDT chain selector */}
            {selectedCrypto === "USDT" && (
              <div>
                <p className="text-xs font-medium text-gray-400 mb-2">Select network</p>
                <div className="flex flex-wrap gap-2">
                  {USDT_CHAINS.map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSelectedChain(ch)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        selectedChain === ch
                          ? "bg-green-500/20 border-green-500/60 text-green-300"
                          : "bg-gray-800/60 border-gray-700/50 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Amount */}
            <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-400">Send exactly</p>
                <button
                  onClick={handleCopyAmount}
                  className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  {copiedAmount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedAmount ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-2xl font-bold text-white">
                {getCryptoAmount()}{" "}
                <span className="text-green-400 text-base">
                  {selectedCrypto === "USDT" ? `USDT (${selectedChain})` : selectedCrypto}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">≈ ${amount} USD</p>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-400">Send to this address</p>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  {copiedAddress ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedAddress ? "Copied!" : "Copy address"}
                </button>
              </div>
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-lg px-4 py-3">
                <p className="font-mono text-xs text-green-300 break-all">{getAddress()}</p>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2.5 p-3 bg-blue-500/8 border border-blue-500/15 rounded-lg">
              <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">
                Send the <strong className="text-white">exact amount</strong> in a single
                transaction. After sending, click &quot;I&apos;ve Sent Payment&quot; below to confirm.
              </p>
            </div>

            {/* Verify button */}
            {!expired && (
              <button
                onClick={handleVerify}
                disabled={verifying || verified}
                className="w-full py-3 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Verifying payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    I&apos;ve Sent Payment
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <CheckoutContent />
    </Suspense>
  );
}
