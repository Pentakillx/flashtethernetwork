"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLicenseActive } from "@/lib/license";
import { Shield, Zap } from "lucide-react";

export function LicenseGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed]   = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("cv_user_email") ?? "";
    if (!email) {
      router.replace("/login");
      return;
    }
    if (!isLicenseActive(email)) {
      router.replace("/dashboard");
      return;
    }
    setAllowed(true);
    setChecked(true);
  }, [router]);

  if (!checked || !allowed) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="w-3.5 h-3.5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            Verifying license...
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-700 mt-1">
            <Zap className="w-3 h-3 text-amber-800" />
            FlashTether NETWORK
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
