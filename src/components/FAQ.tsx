"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is the FlashTether NETWORK and how does it work?",
    answer:
      "FlashTether is enterprise level software that enables instant USDT transfers to any compatible wallet. After purchasing a license, you receive API access and a dashboard to execute flash transfers with configurable parameters including destination wallet, amount, and network selection followed by a tutorial video that explains everything.",
  },
  {
    question: "Is FlashTether transferable between wallets?",
    answer:
      "Yes. Once transferred, the recipient can freely move the USDT to any other wallet. There is no limit on the number of subsequent transfers.",
  },
  {
    question: "What is the validity period of flashed USDT?",
    answer:
      "Flashed USDT has a validity period of 370 days from the date of the transaction, but we have licenses with limited validity period below that range for short term operations.",
  },
  {
    question: "Which networks are supported?",
    answer:
      "FlashTether supports Ethereum Mainnet, Binance Smart Chain, Polygon (Matic), Tron Network, and Avalanche. Network selection is available in the software dashboard during transfer execution.",
  },
  {
    question: "Can FlashTether be used for P2P transactions?",
    answer:
      "Yes. P2P is one of the most common and recommended use cases for FlashTether transfers.",
  },
  {
    question: "How do I receive my license after purchase?",
    answer:
      "After payment confirmation, your license keys, API documentation, and step-by-step setup guide are delivered to the email address and phone/Telegram contact you provided during checkout.",
  },
  {
    question: "What happens after my license expires?",
    answer:
      "When your license expires, you can renew it by purchasing a new plan. All previously executed transfers remain valid for their full validity period regardless of license status.",
  },
  {
    question: "How do I get technical support?",
    answer:
      "Technical support is available as a premium add-on during checkout for a $2 fee. This gives you direct access to our support team via E-mail, WhatsApp and Telegram with guaranteed response times under 5 minutes.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm">
            Common questions about FlashTether licensing and operations.
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-200 ${
                openIndex === index
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-gray-800 bg-gray-900/30 hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left p-4"
              >
                <h3 className="text-sm font-medium pr-6 text-white">{item.question}</h3>
                <ChevronDown
                  className={`h-4 w-4 text-amber-500 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 -mt-1">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
