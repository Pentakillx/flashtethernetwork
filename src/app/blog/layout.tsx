import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flashtethernetwork.vercel.app";

export const metadata: Metadata = {
  title: "Blog & Knowledge Base",
  description:
    "Guides, tutorials, and FAQs about FlashTether NETWORK — from getting started to scaling enterprise USDT flash transfer operations.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog & Knowledge Base | FlashTether NETWORK",
    description:
      "Guides, tutorials, and FAQs about FlashTether NETWORK USDT flash transfer software.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
