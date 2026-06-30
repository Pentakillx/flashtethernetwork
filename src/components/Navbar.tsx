"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-black tracking-tight text-white">
                Flash<span className="text-amber-400">Tether</span>{" "}
                <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                  Network
                </span>
              </span>
              <span className="text-xl">🌐</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("demo")}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Software
            </button>
            <button
              onClick={() => scrollTo("packages")}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Licenses
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </button>
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg transition-all"
            >
              <LogIn className="w-4 h-4" />
              Member Login
            </Link>
            <button
              onClick={() => scrollTo("packages")}
              className="px-5 py-2 text-sm rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => scrollTo("demo")}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50"
            >
              Software
            </button>
            <button
              onClick={() => scrollTo("packages")}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50"
            >
              Licenses
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50"
            >
              FAQ
            </button>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50"
            >
              Blog
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 border border-gray-700/50"
            >
              <LogIn className="w-4 h-4" />
              Member Login
            </Link>
            <button
              onClick={() => scrollTo("packages")}
              className="block w-full text-center px-3 py-2 mt-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
