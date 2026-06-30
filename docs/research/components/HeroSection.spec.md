# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Interaction model:** static (counter animation on mount)

## DOM Structure
`<section>` (relative, min-h-screen, flex items-center, overflow-hidden)
  ├─ Background layer (absolute inset-0)
  │    ├─ gradient: bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950
  │    ├─ `<canvas>` particle animation
  │    └─ gradient overlay: from-transparent to-gray-950/60
  └─ Content (relative z-10, max-w-6xl, px-4 sm:px-6 lg:px-8, py-16 md:py-20)
       └─ max-w-2xl content box
            ├─ Badge: green pill with Zap icon
            ├─ h1: "Instant USDT" + "Flash Transfers"
            ├─ p: description text
            ├─ Button row: Get License + View Software
            └─ Stats row: 3 metrics

## Canvas Particle Animation (ParticleCanvas component)
Separate client component. Canvas fills absolute inset, full-width/height.

Algorithm:
- 95 particles, each with random position (x,y) and velocity
- Velocity magnitude: 0.22 + Math.random() * 0.42 (so 0.22–0.64 px/frame)
- Velocity direction: random angle 0–2π
- Particles wrap around canvas edges
- Connections: drawn between particles within 150px of each other
  - Line opacity tiers: (tier+0.5)/5 * 0.42, where tier = floor(proximity * 5), max tier = 4
  - Line width: 0.8, color: rgba(34,197,94, opacity)
- Small glowing particles: radial gradient 8px, rgba(130,255,160,0.95) center → rgba(34,197,94,0.45) at 35% → transparent
- Large "traveling" particles: radial gradient 13px, rgba(210,255,225,1) center → rgba(80,255,150,0.65) at 35% → transparent
- Up to 60 traveling particles at once, spawn every 110ms when connections exist
- Traveling particles move along connection line at speed 0.007–0.02 per frame
- Canvas paused via IntersectionObserver when not visible
- Uses compositeOperation "lighter" for glow particles over dark background
- DPR-aware: scale by Math.min(devicePixelRatio, 2)
- Responds to window resize

## Computed Styles

### Section
- minHeight: 100vh
- display: flex
- alignItems: center
- overflow: hidden
- position: relative

### Badge
- display: inline-flex
- alignItems: center
- padding: 6px 12px (px-3 py-1.5)
- background: rgba(34,197,94,0.15) (bg-green-500/15)
- border: 1px solid rgba(34,197,94,0.25) (border-green-500/25)
- borderRadius: 9999px (rounded-full)
- color: rgb(74,222,128) (text-green-400)
- fontSize: 12px (text-xs)
- fontWeight: 500 (font-medium)
- marginBottom: 24px (mb-6)
- Zap icon: 14px w-3.5 h-3.5 mr-1.5

### h1
- fontSize: 36px md:48px (text-4xl md:text-5xl)
- fontWeight: 700 (font-bold)
- lineHeight: 1.1 (leading-[1.1])
- letterSpacing: -0.025em (tracking-tight)
- marginBottom: 20px (mb-5)
- First line "Instant USDT": text-white
- Second line "Flash Transfers": bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent

### Description p
- fontSize: 16px md:18px (text-base md:text-lg)
- color: rgb(156,163,175) (text-gray-400)
- maxWidth: 512px (max-w-lg)
- lineHeight: 1.625 (leading-relaxed)
- marginBottom: 32px (mb-8)

### CTA buttons row
- display: flex (flex-col sm:flex-row)
- gap: 12px (gap-3)
- marginBottom: 40px (mb-10)

### "Get License" button (primary)
- display: inline-flex items-center justify-center
- padding: 12px 24px (px-6 py-3)
- fontSize: 14px (text-sm)
- fontWeight: 600 (font-semibold)
- borderRadius: 8px (rounded-lg)
- background: rgb(34,197,94) (bg-green-500)
- hover: bg-green-600
- color: white
- transition: all
- hover shadow: shadow-lg shadow-green-500/25
- ArrowRight icon: ml-2 h-4 w-4, translates right on group-hover

### "View Software" button (secondary)
- padding: 12px 24px (px-6 py-3)
- fontSize: 14px (text-sm)
- fontWeight: 500 (font-medium)
- borderRadius: 8px (rounded-lg)
- border: 1px solid rgb(55,65,81) (border-gray-700)
- color: rgb(209,213,219) (text-gray-300)
- hover: text-white, border-gray-600
- transition: all

### Stats grid
- display: grid (grid-cols-3)
- gap: 24px (gap-6)
- maxWidth: 448px (max-w-md)

### Stat item
Each stat has: icon (w-3.5 h-3.5 text-green-500) + value (text-lg font-bold text-white) in a flex row, then label (text-xs text-gray-500)

Stats:
1. Shield icon — "AES-256" — "Encryption"
2. Clock icon — "<3s" — "Execution"
3. TrendingUp icon — counter animates from 0 to 50 then shows "50M+" — "USDT Flashed"

Counter animation: setInterval, adds 0.833/frame every 30ms until reaches 50, shows Math.floor(value) + "M+"

## Text Content (verbatim)
- Badge: "Flash USDT Sender"
- H1 line 1: "Instant USDT"
- H1 line 2: "Flash Transfers"
- Body: "The best Flash USDT sending software for executing USDT flash transfers with security, real time monitoring, and 99.9% success rate."
- Button 1: "Get License"
- Button 2: "View Software"
- Stat 1: "AES-256" / "Encryption"
- Stat 2: "<3s" / "Execution"
- Stat 3: "[counter]M+" / "USDT Flashed"

## Responsive Behavior
- **Desktop (1024px+):** content max-w-2xl, buttons in sm:flex-row
- **Mobile:** buttons stack vertically (flex-col), h1 smaller (text-4xl)
- **Padding:** py-16 md:py-20, px-4 sm:px-6 lg:px-8
