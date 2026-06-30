"use client";

import { ArrowRight, CheckCircle, Clock, DollarSign, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";
import { useT } from "@/lib/i18n";

const STEP_ICONS = [Target, CheckCircle, Zap, TrendingUp];
const STAT_ICONS = [DollarSign, Users, Clock, Shield];

export function HowToStart() {
  const { t } = useT();
  const h = t.howToStart;

  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium backdrop-blur-sm mb-4">
            <Zap className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
            {h.badge}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            {h.title}
          </h2>
          <p className="max-w-xl mx-auto text-gray-300 text-sm">{h.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Steps */}
          <div className="space-y-3">
            {h.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40 rounded-xl p-5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -right-8 -top-8 w-20 h-20 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-colors" />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-500/30 to-amber-600/30 rounded-lg flex-shrink-0 group-hover:from-amber-500/50 group-hover:to-amber-600/50 transition-colors border border-amber-500/20">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                        <span className="px-2 py-0.5 bg-amber-500/30 text-amber-300 rounded-full text-xs font-bold">{num}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={scrollToPackages}
                className="group inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-500/40"
              >
                {h.browsePlans}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="relative lg:pl-6 space-y-4">
            {/* System Requirements */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-amber-500/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white">{h.systemReq}</h3>
              </div>
              <div className="space-y-2">
                {h.sysReqItems.map((req, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-amber-500/15 hover:border-amber-500/30 transition-all">
                    <span className="text-gray-300 text-sm">{req.label}</span>
                    <span className="text-amber-400 font-bold text-xs">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Networks */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-amber-500/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white">{h.networks}</h3>
              </div>
              <div className="space-y-2">
                {h.networkList.map((network, i) => (
                  <div key={i} className="flex items-center p-3 bg-gray-900/50 rounded-lg border border-amber-500/15 hover:border-amber-500/30 transition-all">
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mr-3" />
                    <span className="text-gray-300 text-sm">{network}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support card */}
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-500/40 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-sm">{h.supportIncluded}</h4>
                  <p className="text-gray-400 text-xs">{h.supportDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {h.stats.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div key={i} className="text-center p-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-amber-500/20 rounded-xl hover:border-amber-500/40 transition-all duration-300 group">
                <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-500/30 transition-colors">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
