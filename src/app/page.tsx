import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SoftwareDemo } from "@/components/SoftwareDemo";
import { OpenSoftware } from "@/components/OpenSoftware";
import { HowToStart } from "@/components/HowToStart";
import { LicensePackages } from "@/components/LicensePackages";
import { FAQ } from "@/components/FAQ";
import { LiveChatCTA } from "@/components/LiveChatCTA";
import { Footer } from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flashtethernetwork.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FlashTether NETWORK",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Enterprise-grade software for instant USDT flash transfers across ERC20, BEP20, TRC20, Polygon, and Avalanche networks.",
  offers: [
    {
      "@type": "Offer",
      name: "Basic Plan",
      priceCurrency: "USD",
      price: "49",
      description: "Up to 50,000 USDT/month, 370-day validity",
    },
    {
      "@type": "Offer",
      name: "Premium Plan",
      priceCurrency: "USD",
      price: "149",
      description: "Up to 150,000 USDT/month, 370-day validity",
    },
    {
      "@type": "Offer",
      name: "Master Plan",
      priceCurrency: "USD",
      price: "499",
      description: "Up to 50,000,000 USDT/month, 370-day validity",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-amber-900/50 via-amber-900/30 to-gray-950 text-white">
        <Navbar />
        <main>
          <HeroSection />
          <SoftwareDemo />
          <OpenSoftware />
          <HowToStart />
          <LicensePackages />
          <FAQ />
        </main>
        <Footer />
        <LiveChatCTA />
      </div>
    </>
  );
}
