import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SoftwareDemo } from "@/components/SoftwareDemo";
import { OpenSoftware } from "@/components/OpenSoftware";
import { HowToStart } from "@/components/HowToStart";
import { LicensePackages } from "@/components/LicensePackages";
import { FAQ } from "@/components/FAQ";
import { LiveChatCTA } from "@/components/LiveChatCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
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
  );
}
