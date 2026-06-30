"use client";

import { useRouter } from "next/navigation";
import { Zap, Check } from "lucide-react";
import { PRICES, PLANS, DEMO_PLAN } from "@/lib/site-config";


export function LicensePackages() {
  const router = useRouter();

  const getPrice = (planKey: string, durationKey: string) =>
    PRICES[planKey]?.[durationKey] ?? 0;

  const handleBuy = (planKey: string, durationKey: string) => {
    const durationMap: Record<string, string> = {
      "1 hour": "1 hour",
      "1 day": "1 day",
      "7 days": "7 days",
      "1 month": "1 month",
      instant: "instant",
    };
    router.push(`/checkout?plan=${planKey}&duration=${durationMap[durationKey] ?? durationKey}`);
  };

  return (
    <section id="packages" className="py-14 bg-gradient-to-b from-gray-950/50 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium backdrop-blur-sm mb-4">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Enterprise Licenses
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            Choose Your License Plan
          </h2>
          <p className="max-w-xl mx-auto text-gray-300 text-sm">
            Flexible, transparent pricing for serious traders. Select the plan that matches your transaction volume and requirements.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end mb-8">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${
                plan.featured
                  ? "md:scale-105 bg-gradient-to-br from-amber-900/40 to-gray-900/40 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20 mt-4"
                  : "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-2 border-gray-700/50 hover:border-amber-500/30"
              }`}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl pointer-events-none" />

              {/* Most Popular badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-gray-900 px-5 py-1 rounded-full text-xs font-bold shadow-xl whitespace-nowrap z-10">
                  Most Popular
                </div>
              )}

              <div className="relative z-10 p-6">
                {/* Plan header */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-xs">{plan.subtitle}</p>
                </div>

                {/* Tier list */}
                <div className="space-y-1.5 mb-5">
                  {plan.tiers.map((tier, i) => (
                    <div
                      key={i}
                      className="bg-gray-900/60 rounded-lg p-2.5 border border-amber-500/10 hover:border-amber-500/30 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium text-xs">{tier.duration}</span>
                        <div className="text-right">
                          <div className="font-bold text-sm text-amber-400">
                            ${getPrice(plan.key, tier.durationKey)}
                          </div>
                          <div className="text-xs text-amber-300/70">{tier.limit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 my-5" />

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300">
                      <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Buy buttons */}
                <div className="space-y-1.5 mt-auto">
                  {plan.tiers.map((tier) => (
                    <button
                      key={tier.duration}
                      onClick={() => handleBuy(plan.key, tier.durationKey)}
                      className={`w-full px-4 py-2 rounded-lg font-semibold transition-all text-xs ${
                        plan.featured
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-amber-500/40 transform hover:scale-105"
                          : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-amber-600 hover:to-amber-700 text-white hover:scale-105"
                      }`}
                    >
                      Buy {tier.duration} - ${getPrice(plan.key, tier.durationKey)}
                    </button>
                  ))}
                </div>

                {plan.featured && (
                  <p className="text-center mt-3 text-xs text-amber-400">
                    Most popular choice for serious traders
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Demo card */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="relative rounded-2xl backdrop-blur-sm bg-gradient-to-br from-blue-900/40 via-gray-900/40 to-blue-900/40 border border-blue-500/50 shadow-xl shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/10 rounded-2xl pointer-events-none" />
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white px-6 py-1 rounded-full text-xs font-bold shadow-xl whitespace-nowrap z-10">
              Try Before You Buy
            </div>
            <div className="relative z-10 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                {/* Left: demo info */}
                <div className="lg:col-span-1">
                  <h3 className="text-xl font-bold text-white mb-1">Demo</h3>
                  <p className="text-gray-300 text-sm mb-4">Test before you commit</p>
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs mb-1">1 day Full Access</p>
                      <p className="text-3xl font-bold text-blue-400 mb-0.5">
                        ${getPrice("demo", "1 hour")}
                      </p>
                      <p className="text-xs text-blue-300/70">750 USDT Flash Limit</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuy("demo", "1 hour")}
                    className="w-full px-6 py-2.5 rounded-lg font-semibold transition-all text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/40 transform hover:scale-105"
                  >
                    Try Demo - ${getPrice("demo", "1 hour")}
                  </button>
                </div>

                {/* Right: demo features */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DEMO_PLAN.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 bg-gray-900/60 rounded-lg border border-blue-500/20"
                      >
                        <Check className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200 text-xs font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-gray-300 text-xs text-center">
                      Perfect for testing the software capabilities before investing in a full license.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
