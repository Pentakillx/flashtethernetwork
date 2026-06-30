# SoftwareDemo Specification

## Overview
- **Target file:** `src/components/SoftwareDemo.tsx`
- **Interaction model:** click-driven tabs (3 tabs)

## DOM Structure
`<section id="demo">` (py-10, bg-gray-950, relative, overflow-hidden)
  ├─ Background blur: absolute top-20 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl
  └─ max-w-5xl container
       ├─ Header: h2 + p
       ├─ App window mock: bg-gray-900/80 border border-gray-800 rounded-2xl
       │    ├─ Title bar: 3 traffic light dots + "Flash USDT Pro v4.2"
       │    ├─ Tab bar: Dashboard | API Demo | Security
       │    └─ Content area (p-6): varies by active tab
       └─ Bottom feature grid: 4 items

## Tab Content

### Tab 1: Dashboard (default active)
2-column grid (grid-cols-1 md:grid-cols-2 gap-4)

Left column - "Transfer Configuration":
- Section label: text-xs text-gray-500 uppercase tracking-wider
- 4 rows in bg-gray-800/50 rounded-lg p-3: flex justify-between
  - Destination: "0x742d35Cc6634C053..."
  - Amount: "500,000.00 USDT"
  - Network: "Ethereum Mainnet"
  - Gas: "45 Gwei"
- Labels: text-gray-400, values: text-green-400 font-semibold

Right column - "System Status":
- Green status box: bg-green-500/10 border border-green-500/20 rounded-lg p-4
  - Pulsing green dot + "All Systems Operational" (text-green-400)
  - "Latency: 42ms | Uptime: 99.99%" (text-gray-500 text-xs)
- 3 metric rows: bg-gray-800/50 rounded-lg p-3
  - Success Rate: "99.9%"
  - Avg. Execution: "1.2s"
  - Active Sessions: "2,847"
- Metric labels: text-gray-400, values: text-white font-semibold

### Tab 2: API Demo
`<pre>` with green text (text-green-400 text-xs whitespace-pre-wrap overflow-x-auto)
3 JSON blocks showing API request/response examples:
1. Create withdrawal intent (POST /withdrawals)
2. Prepare signable payload (POST /withdrawals/wd_eth_001/prepare)
3. Submit signed tx (POST /withdrawals/wd_eth_001/submit)

### Tab 3: Security
3 items in space-y-3, each: flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg
- Lock icon (w-4 h-4 text-green-400 mt-0.5 flex-shrink-0)
- Title (text-green-400 font-semibold text-sm) + desc (text-gray-500 text-xs)
Items:
1. "End-to-End Encryption" / "AES-256 on all transactions and API calls"
2. "Multi-Signature Auth (Optional)" / "2-of-3 signature requirement for execution"
3. "Threat Detection" / "Real-time monitoring and anomaly detection"

## Computed Styles

### Section
- padding: 40px 0 (py-10)
- background: rgb(3,7,18) (bg-gray-950)

### App window
- background: rgba(17,24,39,0.8) (bg-gray-900/80)
- border: 1px solid rgb(31,41,55) (border-gray-800)
- borderRadius: 16px (rounded-2xl)
- boxShadow: 0 25px 50px rgba(0,0,0,0.8) (shadow-2xl)
- overflow: hidden

### Title bar
- background: rgb(17,24,39) (bg-gray-900)
- borderBottom: 1px solid rgb(31,41,55) (border-gray-800)
- padding: 12px 24px (px-6 py-3)
- display: flex, alignItems: center, gap: 12px
- Traffic lights: w-3 h-3 rounded-full; red: bg-red-500/80, yellow: bg-yellow-500/80, green: bg-green-500/80
- App name: text-gray-500 text-sm ml-2

### Tab bar
- borderBottom: 1px solid rgb(31,41,55)
- padding: 0 24px
- display: flex, gap: 4px
- Each tab: py-3 px-4 text-sm font-medium flex items-center gap-2
- Active tab: border-b-2 border-green-500, text-green-400
- Inactive: border-transparent text-gray-500 hover:text-gray-300

### Feature grid
- grid grid-cols-2 md:grid-cols-4 gap-4 mt-8
- Each: flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl
- Icon: w-5 h-5 text-green-500 flex-shrink-0
- Text: text-sm text-gray-300

## Feature Grid Items
1. Zap icon — "Sub-second execution"
2. BarChart3 icon — "Real-time analytics"
3. Lock icon — "Military-grade security"
4. Code icon — "RESTful API access"

## Text Content
- Section title: "Software Preview"
- Section subtitle: "Enterprise dashboard with real-time monitoring and advanced security."
- App title bar: "Flash USDT Pro v4.2"
- Tab 1: "Dashboard" (BarChart3 icon)
- Tab 2: "API Demo" (Code icon)
- Tab 3: "Security" (Lock icon)

## Responsive Behavior
- **Desktop:** 2-column dashboard grid visible
- **Mobile:** grid-cols-1 for dashboard, single column
- **Container:** max-w-5xl, px-4 sm:px-6 lg:px-8
