"use client";

import { ArrowRight, CheckCircle, Clock, DollarSign, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Choose Your Plan",
    description:
      "Select from Basic, Infinity, or Master licenses based on your flash volume requirements.",
    icon: Target,
  },
  {
    step: "02",
    title: "Secure Checkout",
    description:
      "Choose your desired duration and complete the secure checkout with email and contact information.",
    icon: CheckCircle,
  },
  {
    step: "03",
    title: "Instant Activation",
    description:
      "Upon payment confirmation, receive your license keys and setup instructions via email and Telegram.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Begin Operations",
    description:
      "Configure your wallets and start executing USDT flash transfers with enterprise-grade reliability.",
    icon: TrendingUp,
  },
];

const SYSTEM_REQUIREMENTS = [
  { label: "API Support", value: "RESTful HTTP/2" },
  { label: "Authentication", value: "OAuth 2.0 + API Keys" },
  { label: "Rate Limiting", value: "10,000 req/min" },
  { label: "Uptime Guarantee", value: "99.99% SLA" },
  { label: "Response Time", value: "<100ms average" },
];

const NETWORKS = [
  "Ethereum Mainnet",
  "Binance Smart Chain",
  "Polygon (Matic)",
  "Tron Network",
  "Avalanche",
];

const STATS = [
  { value: "50M+", label: "USDT Flashed", icon: DollarSign },
  { value: "10K+", label: "Active Users", icon: Users },
  { value: "99.9%", label: "Success Rate", icon: Clock },
  { value: "24/7", label: "Support", icon: Shield },
];

export function HowToStart() {
  const scrollToPackages = () => {
    const el = document.getElementById("packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-medium backdrop-blur-sm mb-4">
            <Zap className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
            Quick Start Guide
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
            Get Started in 4 Steps
          </h2>
          <p className="max-w-xl mx-auto text-gray-300 text-sm">
            From purchase to operation in minutes. Follow our professional setup guide and begin
            flashing USDT immediately.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Steps */}
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 rounded-xl p-5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-20 h-20 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-lg flex-shrink-0 group-hover:from-green-500/50 group-hover:to-green-600/50 transition-colors border border-green-500/20">
                    <step.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <span className="px-2 py-0.5 bg-green-500/30 text-green-300 rounded-full text-xs font-bold">
                        {step.step}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={scrollToPackages}
                className="group inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/40"
              >
                Browse Plans
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="relative lg:pl-6 space-y-4">
            {/* System Requirements */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="text-base font-bold text-white">System Requirements</h3>
              </div>
              <div className="space-y-2">
                {SYSTEM_REQUIREMENTS.map((req, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-green-500/15 hover:border-green-500/30 transition-all"
                  >
                    <span className="text-gray-300 text-sm">{req.label}</span>
                    <span className="text-green-400 font-bold text-xs">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Networks */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="text-base font-bold text-white">Supported Networks</h3>
              </div>
              <div className="space-y-2">
                {NETWORKS.map((network, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 bg-gray-900/50 rounded-lg border border-green-500/15 hover:border-green-500/30 transition-all"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3" />
                    <span className="text-gray-300 text-sm">{network}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support card */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/40 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-sm">Premium Support Included</h4>
                  <p className="text-gray-400 text-xs">
                    All plans include dedicated support. Contact information becomes available
                    immediately after successful payment verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl hover:border-green-500/40 transition-all duration-300 group"
            >
              <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-500/30 transition-colors">
                <stat.icon className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
