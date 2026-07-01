import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flashtethernetwork.vercel.app";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FlashTether NETWORK — Enterprise USDT Flash Transfer Software",
    template: "%s | FlashTether NETWORK",
  },
  description:
    "FlashTether NETWORK v4.2 — Professional enterprise-grade software for instant USDT flash transfers across ERC20, BEP20, TRC20 networks. AES-256 encryption, 99.9% success rate, 24/7 support.",
  keywords: [
    "flash usdt",
    "flash usdt sender",
    "usdt flash transfer",
    "flash tether",
    "flash usdt software",
    "usdt sender software",
    "trc20 flash usdt",
    "erc20 flash usdt",
    "bep20 flash usdt",
    "crypto flash software",
    "usdt transfer tool",
  ],
  authors: [{ name: "FlashTether NETWORK" }],
  creator: "FlashTether NETWORK",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FlashTether NETWORK",
    title: "FlashTether NETWORK — Enterprise USDT Flash Transfer Software",
    description:
      "Professional enterprise-grade software for instant USDT flash transfers across ERC20, BEP20, TRC20 networks. Licensed, encrypted, and built for scale.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlashTether NETWORK — Enterprise USDT Flash Transfer Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlashTether NETWORK — Enterprise USDT Flash Transfer Software",
    description:
      "Professional enterprise-grade software for instant USDT flash transfers across ERC20, BEP20, TRC20 networks.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-inter bg-gray-950 text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
