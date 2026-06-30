"use client";

import { useState, useEffect } from "react";
import { Zap, Shield, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { ParticleCanvas } from "./ParticleCanvas";
import { useT } from "@/lib/i18n";
import { STATS } from "@/lib/site-config";

export function HeroSection() {
  const [counter, setCounter] = useState(0);
  const { t } = useT();
  const h = t.hero;

  useEffect(() => {
    const step = STATS.counterTarget / 60;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= STATS.counterTarget) { clearInterval(interval); return STATS.counterTarget; }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-3 py-1.5 bg-amber-500/15 border border-amber-500/25 rounded-full text-amber-400 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            {h.badge}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            <span className="text-white">{h.title1}</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              {h.title2}
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed mb-8">
            {h.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button
              onClick={() => scrollTo("packages")}
              className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              {h.getLicense}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("demo")}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transition-all"
            >
              {h.viewSoftware}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-white">{STATS.encryption}</span>
              </div>
              <span className="text-xs text-gray-500">{h.encryption}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-white">{STATS.executionTime}</span>
              </div>
              <span className="text-xs text-gray-500">{h.execution}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-white">{Math.floor(counter)}M+</span>
              </div>
              <span className="text-xs text-gray-500">{h.usdtFlashed}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
