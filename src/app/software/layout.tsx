import { Sidebar } from "@/components/software/Sidebar";
import { LicenseGuard } from "@/components/software/LicenseGuard";

export const metadata = {
  title: "FlashTether NETWORK — Dashboard",
};

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <LicenseGuard>
      <div className="min-h-screen bg-[#080810] flex text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">{children}</div>
      </div>
    </LicenseGuard>
  );
}
