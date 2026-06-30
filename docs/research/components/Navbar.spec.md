# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Interaction model:** scroll-driven + click-driven (mobile menu)

## DOM Structure
`<nav>` (fixed, full-width, z-50)
  └─ max-w-7xl container
       └─ flex justify-between h-16
            ├─ Logo: Zap icon + "Flash**USDT**" text
            ├─ Desktop nav links (hidden md:flex): Software, Licenses, FAQ, Blog, Get Started
            └─ Mobile: hamburger/X icon button → dropdown menu

## Computed Styles

### nav (base state, scroll = 0)
- position: fixed
- width: 100%
- zIndex: 50
- background: transparent
- transition: all 300ms

### nav (scrolled state, scrollY > 20)
- background: rgba(3, 7, 18, 0.95) (bg-gray-950/95)
- backdropFilter: blur(12px) (backdrop-blur-md)
- borderBottom: 1px solid rgba(31,41,55,0.5) (border-b border-gray-800/50)

### Logo
- Zap icon: h-6 w-6 text-green-500
- Text: "Flash" (text-white) + "USDT" (text-green-500), text-lg font-bold ml-2

### Desktop nav links
- fontSize: 14px (text-sm)
- color: rgb(156,163,175) (text-gray-400)
- hover: color: white
- transition: colors

### "Get Started" button
- padding: 8px 20px (px-5 py-2)
- fontSize: 14px
- borderRadius: 8px
- background: rgb(34,197,94) (bg-green-500)
- hover: bg-green-600
- color: white
- transition: all

## States & Behaviors

### Scroll-triggered transparency
- **Trigger:** `window.scrollY > 20` (scroll listener)
- **State A (scrollY ≤ 20):** transparent background
- **State B (scrollY > 20):** bg-gray-950/95 + backdrop-blur-md + border-b border-gray-800/50
- **Transition:** `transition-all duration-300`
- **Implementation:** `useState` scroll listener with `useEffect` cleanup

### Mobile menu toggle
- **Trigger:** click hamburger button
- **State A:** menu closed, hamburger icon (Menu icon, 24px)
- **State B:** menu open, X icon; dropdown appears below navbar
- **Mobile dropdown:** bg-gray-950/95 backdrop-blur border-b border-gray-800/50, vertical nav links

## Text Content
- Logo: "Flash" + "USDT" (separate spans)
- Nav links: "Software", "Licenses", "FAQ", "Blog"
- CTA: "Get Started"
- Mobile links same as desktop

## Navigation Behavior
- "Software" → scrolls to `#demo` section
- "Licenses" → scrolls to `#packages` section
- "FAQ" → scrolls to `#faq` section
- "Blog" → navigates to `/blog` (Next.js Link)
- "Get Started" → scrolls to `#packages`

## Responsive Behavior
- **Desktop (768px+):** horizontal nav links visible (hidden md:flex)
- **Mobile (<768px):** all links hidden, hamburger menu visible (md:hidden)
- **Mobile menu:** vertical list, full-width links with rounded-lg hover
