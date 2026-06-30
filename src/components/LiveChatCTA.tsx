"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function LiveChatCTA() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleStartChat = () => {
    router.push("/checkout?plan=live-chat&duration=instant");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-4 w-56 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs font-semibold">Support Online</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-gray-400 text-xs mb-3 leading-relaxed">
            Get instant help from our team. Response in under 5 minutes (included in all
            licenses)
          </p>
          <button
            onClick={handleStartChat}
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Start Chat $2
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Live chat support"
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-green-500 hover:bg-green-600 hover:scale-110 shadow-green-500/40"
        }`}
      >
        {open ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}
