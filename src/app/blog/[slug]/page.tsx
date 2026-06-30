"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Check, ArrowRight, Zap } from "lucide-react";
import { blogPosts, type ContentBlock } from "@/lib/blog-posts";

const CTA_PLANS = [
  {
    key: "basic",
    name: "Basic",
    price: "from $49",
    limit: "50k USDT/month",
    validity: "370-day validity",
    border: "border-gray-600/50",
    bg: "bg-gray-800/40",
    badge: "bg-gray-700 text-gray-300",
    anchor: "basic",
  },
  {
    key: "infinity",
    name: "Premium",
    price: "from $99",
    limit: "150k USDT/month",
    validity: "370-day validity",
    border: "border-blue-500/40",
    bg: "bg-blue-900/20",
    badge: "bg-blue-500/20 text-blue-300",
    anchor: "infinity",
  },
  {
    key: "master",
    name: "Master",
    price: "from $799",
    limit: "50M USDT/month",
    validity: "370-day validity",
    border: "border-green-500/40",
    bg: "bg-green-900/20",
    badge: "bg-green-500/20 text-green-300",
    anchor: "master",
  },
];

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={index} className="text-xl font-bold text-white mt-10 mb-2">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="text-base font-semibold text-green-300 mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="text-gray-300 text-sm leading-relaxed">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div key={index} className="mt-12 pt-8 border-t border-gray-800/60">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/15 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              Choose Your Plan
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Ready to Get Started?</h3>
            <p className="text-gray-400 text-sm">
              All plans include 370-day validity on every transfer. Pick the volume that fits your
              operation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CTA_PLANS.map((plan) => (
              <Link
                key={plan.key}
                href="/#packages"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className={`group flex flex-col rounded-xl border ${plan.border} ${plan.bg} p-4 hover:scale-105 transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${plan.badge}`}>
                    {plan.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-white font-bold text-base mb-1">{plan.price}</p>
                <p className="text-gray-400 text-xs mb-1">{plan.limit}</p>
                <div className="flex items-center gap-1 mt-auto pt-3">
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 text-xs">{plan.validity}</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            Click any plan to view full pricing and purchase options.
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Post not found.</p>
          <Link href="/blog" className="text-green-400 hover:text-green-300 text-sm">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push("/blog")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="px-2.5 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
          {post.title}
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mb-10 border-l-2 border-green-500/40 pl-4">
          {post.excerpt}
        </p>

        <div className="h-px bg-gradient-to-r from-green-500/20 via-green-500/10 to-transparent mb-10" />

        <div className="space-y-6">{post.content.map((block, i) => renderBlock(block, i))}</div>

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-800/50">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
              Related Articles
            </h2>
            <div className="space-y-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex items-center gap-4 p-4 bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700/50 hover:border-green-500/30 rounded-xl transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium group-hover:text-green-400 transition-colors truncate">
                      {rel.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{rel.readTime}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-green-400 flex-shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
