"use client";

import { useState, useEffect } from "react";
import { Zap, Shield, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { ParticleCanvas } from "./ParticleCanvas";

export function HeroSection() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const step = 50 / 60;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 50) {
          clearInterval(interval);
          return 50;
        }
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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-amber-500/15 border border-amber-500/25 rounded-full text-amber-400 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            FlashTether NETWORK
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            <span className="text-white">Instant USDT</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              Flash Transfers
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed mb-8">
            The best FlashTether sending software for executing USDT flash
            transfers with security, real time monitoring, and 99.9% success
            rate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button
              onClick={() => scrollTo("packages")}
              className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              Get License
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("demo")}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transition-all"
            >
              View Software
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-white">AES-256</span>
              </div>
              <span className="text-xs text-gray-500">Encryption</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-white">&lt;3s</span>
              </div>
              <span className="text-xs text-gray-500">Execution</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-white">
                  {Math.floor(counter)}M+
                </span>
              </div>
              <span className="text-xs text-gray-500">USDT Flashed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
