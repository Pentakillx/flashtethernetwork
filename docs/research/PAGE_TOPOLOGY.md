# FlashSender.org — Page Topology

## URL
https://flashsender.org

## Tech Stack (Original)
- React SPA (Vite)
- React Router v6
- Tailwind CSS v3
- Supabase (auth/db)
- Google Fonts: Inter (300, 500, 700)

## Clone Stack
- Next.js 16 App Router, React 19
- Tailwind CSS v4
- shadcn/ui

## Page Layout
Single-page scrollable layout. Body: `min-h-screen bg-gradient-to-b from-green-900/50 via-green-900/30 to-gray-950 text-white`

## Sections (Top → Bottom)

### 1. Navbar (FIXED, z-50)
- Component: `Navbar`
- File: `src/components/Navbar.tsx`
- Position: fixed top, full width
- Interaction: **scroll-driven** — transparent at scroll=0, bg-gray-950/95 + backdrop-blur + border-b after scrollY > 20

### 2. Hero Section (FLOW)
- Component: `HeroSection`
- File: `src/components/HeroSection.tsx`
- Background: absolute canvas particle animation + gradient overlays
- Interaction: counter animation (0→50M+), static otherwise

### 3. Software Demo (FLOW, id="demo")
- Component: `SoftwareDemo`
- File: `src/components/SoftwareDemo.tsx`
- Interaction: **click-driven tabs** — 3 tabs (Dashboard, API Demo, Security)

### 4. How To Start (FLOW)
- Component: `HowToStart`
- File: `src/components/HowToStart.tsx`
- 4 steps on left, cards on right (system requirements, supported networks, support)

### 5. License Packages (FLOW, id="packages")
- Component: `LicensePackages`
- File: `src/components/LicensePackages.tsx`
- 3 plan cards + demo card below

### 6. FAQ (FLOW, id="faq")
- Component: `FAQ`
- File: `src/components/FAQ.tsx`
- Interaction: **click-driven** accordion (one open at a time)

### 7. LiveChatCTA (FIXED, z-50, bottom-right)
- Component: `LiveChatCTA`
- File: `src/components/LiveChatCTA.tsx`
- Interaction: click to toggle popup

### 8. Footer (FLOW)
- Component: `Footer`
- File: `src/components/Footer.tsx`
- Static, hover on links

## Z-Index Layers
- z-50: Navbar (fixed top), LiveChatCTA (fixed bottom-right)
- z-10: Section content
- z-0: Background layers (canvas, gradients)

## Scroll IDs
- `#demo` → SoftwareDemo section
- `#packages` → LicensePackages section  
- `#faq` → FAQ section
