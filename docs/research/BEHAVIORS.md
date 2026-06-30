# FlashSender.org — Behavior Documentation

## Scroll Behaviors

### Navbar (scroll-driven)
- **Trigger:** `window.scrollY > 20`
- **Before:** `background: transparent`
- **After:** `background: rgba(3,7,18,0.95)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid rgba(31,41,55,0.5)`
- **Transition:** `transition: all 300ms`
- **Implementation:** scroll event listener in useEffect

## Click Behaviors

### Navbar smooth scroll
- "Software" → `#demo` (SoftwareDemo section)
- "Licenses" → `#packages` (LicensePackages section)
- "FAQ" → `#faq` (FAQ section)
- "Get Started" → `#packages`
- Uses: `document.getElementById(id).scrollIntoView({ behavior: "smooth" })`

### SoftwareDemo tabs (click-driven)
- 3 tabs: Dashboard | API Demo | Security
- Active: `border-b-2 border-green-500 text-green-400`
- Inactive: `border-transparent text-gray-500 hover:text-gray-300`
- Content swaps instantly on click (no transition)

### FAQ accordion (click-driven)
- Single open at a time (clicking open item closes it)
- ChevronDown rotates 180° when open (`transition-transform duration-200`)
- Content reveals with no transition (instant show/hide)

### LiveChatCTA (click-driven)
- Floating button toggles popup panel
- Button: green MessageCircle → gray X on toggle
- Popup: `animate-in fade-in slide-in-from-bottom-2 duration-200`

## Hover States

### Navbar links: `text-gray-400` → `text-white`
### Plan cards: `hover:scale-105`, `hover:border-green-500/30`
### Buy buttons (non-featured): `hover:from-green-600 hover:to-green-700 hover:scale-105`
### Buy buttons (featured/Master): `hover:shadow-green-500/40 hover:scale-105`
### Step cards: `border-green-500/20` → `border-green-500/40`, corner circle glow intensifies
### System requirement rows: `border-green-500/15` → `border-green-500/30`

## Animation

### ParticleCanvas (canvas, time-driven)
- 95 green glowing particles drift slowly (0.22–0.64 px/frame), wrap edges
- Lines connect particles within 150px; 5 opacity tiers based on proximity
- "Traveling" bright particles zoom along connections (up to 60 at once)
- Pauses via IntersectionObserver when off-screen
- DPR-aware (up to 2x)

### Counter animation (HeroSection, time-driven)
- "USDT Flashed" counter: 0 → 50 over ~1.8s (setInterval 30ms, step ≈ 0.833)
- Shows `Math.floor(value)M+`

## Responsive Behaviors

### Navbar (768px breakpoint)
- Desktop (≥768px): horizontal nav with all links visible
- Mobile (<768px): hamburger icon, tapping opens dropdown below navbar

### HeroSection (640px breakpoint)
- Mobile: buttons stack vertically (flex-col)
- Desktop (≥640px): buttons side-by-side (sm:flex-row)
- H1 size: text-4xl mobile → text-5xl md:

### SoftwareDemo (768px breakpoint)
- Dashboard: 2-column grid on desktop, 1-column on mobile
- Feature grid: 2 cols mobile → 4 cols desktop

### HowToStart (1024px breakpoint)
- Desktop: 2-column grid (steps + cards)
- Mobile: single column (steps then cards)
- Stats: 2x2 mobile → 4 cols desktop

### LicensePackages (768px breakpoint)
- Desktop: 3 plan cards side-by-side, Master elevated (md:scale-105)
- Mobile: cards stack vertically
- Demo: lg:grid-cols-3 for left/right split, mobile single column

## No Smooth Scroll Library
The original site does NOT use Lenis, Locomotive Scroll, or other smooth scroll library. Uses native browser smooth scroll via `scrollIntoView({ behavior: "smooth" })`.
