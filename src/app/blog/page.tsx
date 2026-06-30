"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Zap } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

const CATEGORIES = ["All", "How-To Guide", "FAQ"] as const;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const howToGuides = blogPosts.filter((p) => p.category === "How-To Guide");
  const faqs = blogPosts.filter((p) => p.category === "FAQ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Knowledge Base
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            FlashTether NETWORK Blog
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Guides, tutorials, and answers to every question about FlashTether NETWORK — from getting
            started to scaling enterprise operations.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-amber-500 text-white"
                  : "bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* How-To Guides */}
        {(activeCategory === "All" || activeCategory === "How-To Guide") && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
              How-To Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {howToGuides.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-3 group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                    <span className="flex items-center gap-1 text-amber-400 text-xs font-medium group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Deep Dives */}
        {(activeCategory === "All" || activeCategory === "FAQ") && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
              FAQ Deep Dives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700/50 hover:border-amber-500/30 rounded-xl p-5 transition-all duration-200"
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mt-0.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm mb-1.5 group-hover:text-amber-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-gray-600 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 flex-shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
