# LicensePackages Specification

## Overview
- **Target file:** `src/components/LicensePackages.tsx`
- **Interaction model:** click-driven (buy buttons navigate to checkout)

## Pricing Data (hardcoded)
```
live-chat: { instant: 2 }
demo: { "1 hour": 40 }
basic: { "1 day": 100, "7 days": 500, "1 month": 1500 }
infinity: { "1 day": 250, "7 days": 750, "1 month": 2500 }   → shown as "Premium" in UI
master: { "1 day": 1500, "7 days": 5000, "1 month": 25000 }
```

## Section Structure
`<section id="packages">` (py-14, bg-gradient-to-b from-gray-950/50 via-gray-900 to-gray-950)
  └─ max-w-6xl container
       ├─ Header (text-center mb-10): badge + h2 + p
       ├─ 3-card grid (md:grid-cols-3 gap-5 items-end mb-8): Basic | Premium | Master
       └─ Demo card (max-w-4xl, full-width below grid)

## Header
- Badge: "Enterprise Licenses" with Zap icon, bg-green-500/20 border-green-500/30
- h2: "Choose Your License Plan" — gradient from-white to-green-300
- p: "Flexible, transparent pricing for serious traders. Select the plan that matches your transaction volume and requirements."

## Plan Cards (Basic, Premium/Infinity, Master)

Order in grid: Basic, Infinity (shown as "Premium"), Master

### Basic Card
- Container: rounded-2xl backdrop-blur-sm bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-2 border-gray-700/50 hover:border-green-500/30 hover:scale-105 transition-all duration-300
- No "Most Popular" badge
- Subtitle: "Perfect for getting started"
- Tiers: 1 day ($100, 2k USDT), 7 days ($500, 10k USDT), 1 month ($1500, 50k USDT)
- Features: see feature list below
- Buy buttons: bg-gradient-to-r from-gray-700 to-gray-600 hover:from-green-600 hover:to-green-700 text-white

### Premium Card (Infinity)
- Same non-featured styling as Basic
- Subtitle: "For growing operations"
- Tiers: 1 day ($250, 15k USDT), 7 days ($750, 50k USDT), 1 month ($2500, 150k USDT)
- Buy buttons: same as Basic

### Master Card (FEATURED — center, slightly elevated)
- Container: md:scale-105 bg-gradient-to-br from-green-900/40 to-gray-900/40 border-2 border-green-500/50 shadow-2xl shadow-green-500/20 mt-4 rounded-2xl
- Badge: "Most Popular" (absolute -top-3.5, centered, bg-gradient-to-r from-green-500 via-green-400 to-green-500, text-gray-900, px-5 py-1 rounded-full text-xs font-bold)
- Subtitle: "Enterprise-grade solution"
- Tiers: 1 day ($1500, 350k USDT), 7 days ($5000, 1M USDT), 1 month ($25000, 50M USDT)
- Features: see feature list
- Bottom note: "Most popular choice for serious traders" (text-center text-xs text-green-400)
- Buy buttons: bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/40 transform hover:scale-105

## Feature Lists

### Basic features
- Flash up to 50k USDT
- Standard Flash Limits
- Email Support
- Basic Features
- Regular Updates
- 370 days validity
- Step-by-Step Guide
- Telegram/WhatsApp Support

### Premium/Infinity features
- Flash up to 150k USDT
- High Flash Limits
- Premium Support
- Advanced Features
- 370 days validity
- Priority Updates
- Step-by-Step Guide
- Priority WhatsApp/Telegram Support

### Master features
- Flash up to 50M USDT
- Highest Flash Limits
- Priority Support
- Unlimited Transfers
- Extended Validity (370 days)
- Instant Activation
- Step-by-Step Guide
- VIP WhatsApp/Telegram Support

## Plan Card Internal Structure
```
relative z-10 p-6
├─ mb-5: h3 (text-xl font-bold text-white) + p subtitle (text-gray-400 text-xs)
├─ Tier list (space-y-1.5 mb-5):
│    Each tier: bg-gray-900/60 rounded-lg p-2.5 border border-green-500/10 hover:border-green-500/30
│    Inside: flex justify-between
│             span: duration label (text-gray-300 font-medium text-xs)
│             div.right: price $X (font-bold text-sm text-green-400) + limit (text-xs text-green-300/70)
├─ Divider: h-px bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-500/10 my-5
├─ Feature list (space-y-2 mb-5):
│    Each: Check icon (h-4 w-4 text-green-400) + span (text-xs text-gray-300)
└─ Buy buttons (space-y-1.5): one per tier
```

## Demo Card (below 3-card grid, full-width max-w-4xl)
- Container: relative rounded-2xl bg-gradient-to-br from-blue-900/40 via-gray-900/40 to-blue-900/40 border border-blue-500/50 shadow-xl shadow-blue-500/10
- Badge: "Try Before You Buy" (absolute -top-3.5, bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500, text-white, px-6 py-1)
- 3-column grid: left col (plan info) + right 2 cols (features)

Left col:
- h3: "Demo" (text-xl font-bold text-white)
- p: "Test before you commit"
- Price box: bg-blue-500/10 rounded-xl p-4 border border-blue-500/30
  - "1 day Full Access" (text-gray-400 text-xs)
  - "$40" (text-3xl font-bold text-blue-400)
  - "750 USDT Flash Limit" (text-xs text-blue-300/70)
- Buy button: "Try Demo - $40" (bg-gradient-to-r from-blue-500 to-blue-600, full-width)

Right 2 cols:
- Features grid (grid-cols-1 sm:grid-cols-2 gap-2):
  Each: flex items-start gap-2 p-3 bg-gray-900/60 rounded-lg border border-blue-500/20
  - Check icon (text-blue-400) + text (text-gray-200 text-xs font-medium)
  Features: Flash up to 750 USDT, 1 day Full Access, Test All Features, Instant Activation, Email Support, Telegram/WhatsApp Support, Perfect for Testing
- Note: "Perfect for testing the software capabilities before investing in a full license." (text-gray-300 text-xs text-center)

## Navigation
- Buy buttons navigate to: `/checkout?plan={planKey}&duration={duration}`
- planKey values: "basic", "infinity" (not "premium"), "master", "demo"
- duration values: "1 day", "7 days", "1 month", "1 hour" (for demo)

## Responsive Behavior
- **Desktop:** grid-cols-3 for plan cards, Master card slightly elevated (md:scale-105)
- **Mobile:** grid-cols-1 (cards stack)
- **Demo card:** lg:grid-cols-3 inside (left 1 col, right 2 cols); mobile: single column
