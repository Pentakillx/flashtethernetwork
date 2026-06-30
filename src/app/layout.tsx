import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FlashTether NETWORK - Enterprise USDT Flash Transfer Software | Get Access Now",
  description:
    "FlashTether NETWORK v4.2 - Professional enterprise-grade software for instant USDT flash transfers across ERC20, BEP20, TRC20 networks. Licensed unlimited flashing with AES-256 encryption, real-time monitoring, 99.9% success rate, and 24/7 support.",
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
