"use client";

import { useState } from "react";
import { BarChart3, Code, Lock, Zap } from "lucide-react";

const API_DEMO_JSON = `{
  "title": "Create withdrawal intent (hold funds) — ETH USDT",
  "request": {
    "method": "POST",
    "path": "/withdrawals",
    "headers": {
      "Authorization": "Bearer <jwt>",
      "Idempotency-Key": "6a0f7d7b-7e3b-4f6c-9b2a-8c3d2b5b1a11"
    },
    "body": {
      "wallet_id": "wal_123",
      "asset": "USDT",
      "network": "ETH",
      "amount": "50.00",
      "to_address": "0xReceiver222222222222222222222222222222222222",
      "from_address_id": "addr_hot_eth_1",
      "client_reference": "wd_001"
    }
  },
  "response": {
    "status": 201,
    "body": {
      "id": "wd_eth_001",
      "status": "awaiting_signature",
      "expires_at": "2027-05-01T11:27:00Z"
    }
  }
}
{
  "title": "Prepare signable payload — ETH USDT (EIP-1559)",
  "request": {
    "method": "POST",
    "path": "/withdrawals/wd_eth_001/prepare",
    "headers": { "Authorization": "Bearer <jwt>" },
    "body": { "fee_preference": "medium" }
  },
  "response": {
    "status": 200,
    "body": {
      "withdrawal_id": "wd_eth_001",
      "signing_type": "evm",
      "chain_id": 1,
      "from": "0xH0tWalletEeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "to": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "value": "0x0",
      "nonce": "0x12",
      "gas_limit": "0x186a0",
      "max_fee_per_gas": "10",
      "deadline": "2028-05-01T11:28:00Z"
    }
  }
}
{
  "title": "Submit signed tx for broadcast — ETH USDT",
  "request": {
    "method": "POST",
    "path": "/withdrawals/wd_eth_001/submit",
    "headers": { "Authorization": "Bearer <jwt>" },
    "body": { "signed_tx": "0x02f8...signedRLPHere..." }
  },
  "response": {
    "status": 200,
    "body": {
      "id": "wd_eth_001",
      "status": "broadcasted",
      "tx_hash": "0xethwithdraw00000000000000000001",
      "broadcasted_at": "2027-02-09T18:35:10Z"
    }
  }
}`;

type TabId = "dashboard" | "api" | "security";

const TABS = [
  { id: "dashboard" as TabId, label: "Dashboard", icon: BarChart3 },
  { id: "api" as TabId, label: "API Demo", icon: Code },
  { id: "security" as TabId, label: "Security", icon: Lock },
];

const DASHBOARD_CONFIG = [
  { label: "Destination", value: "0x742d35Cc6634C053..." },
  { label: "Amount", value: "500,000.00 USDT" },
  { label: "Network", value: "Ethereum Mainnet" },
  { label: "Gas", value: "45 Gwei" },
];

const DASHBOARD_STATUS = [
  { label: "Success Rate", value: "99.9%" },
  { label: "Avg. Execution", value: "1.2s" },
  { label: "Active Sessions", value: "2,847" },
];

const SECURITY_ITEMS = [
  { title: "End-to-End Encryption", desc: "AES-256 on all transactions and API calls" },
  { title: "Multi-Signature Auth (Optional)", desc: "2-of-3 signature requirement for execution" },
  { title: "Threat Detection", desc: "Real-time monitoring and anomaly detection" },
];

const FEATURES = [
  { icon: Zap, label: "Sub-second execution" },
  { icon: BarChart3, label: "Real-time analytics" },
  { icon: Lock, label: "Military-grade security" },
  { icon: Code, label: "RESTful API access" },
];

export function SoftwareDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <section id="demo" className="py-10 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
            Software Preview
          </h2>
          <p className="max-w-lg mx-auto text-gray-400 text-sm">
            Enterprise dashboard with real-time monitoring and advanced security.
          </p>
        </div>

        {/* App Window */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            </div>
            <span className="text-gray-500 text-sm ml-2">FlashTether Pro v4.2</span>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800 px-6 flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-sm font-medium transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === tab.id
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 font-mono text-sm">
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Transfer config */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Transfer Configuration
                  </div>
                  {DASHBOARD_CONFIG.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg"
                    >
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-amber-400 font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
                {/* Right: Status */}
                <div className="space-y-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                    System Status
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      <span className="text-amber-400 font-semibold">All Systems Operational</span>
                    </div>
                    <p className="text-gray-500 text-xs">Latency: 42ms | Uptime: 99.99%</p>
                  </div>
                  <div className="space-y-2">
                    {DASHBOARD_STATUS.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between p-3 bg-gray-800/50 rounded-lg"
                      >
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-white font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <pre className="text-amber-400 text-xs whitespace-pre-wrap overflow-x-auto">
                {API_DEMO_JSON}
              </pre>
            )}

            {activeTab === "security" && (
              <div className="space-y-3">
                {SECURITY_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                    <Lock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-amber-400 font-semibold text-sm">{item.title}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {FEATURES.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl"
            >
              <item.icon className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-sm text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
