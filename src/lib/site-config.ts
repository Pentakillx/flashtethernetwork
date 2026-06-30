// ============================================================
//  SITE CONFIG — tek güncelleme noktası
//  Tüm fiyatları, adresleri ve site bilgilerini buradan değiştir.
// ============================================================

// -----------------------------------------------------------
// 1. GENEL SİTE BİLGİLERİ
// -----------------------------------------------------------
export const SITE = {
  name: "FlashTether NETWORK",
  nameShort: "FlashTether",
  tagline: "Enterprise Tether flash transfer software with military-grade security and real-time monitoring.",
  softwareVersion: "v4.2",
  copyrightYear: new Date().getFullYear(),
  seoTitle: "FlashTether NETWORK - Enterprise USDT Flash Transfer Software | Get Access Now",
  seoDescription:
    "FlashTether NETWORK v4.2 - Professional enterprise-grade software for instant USDT flash transfers across ERC20, BEP20, TRC20 networks. Licensed unlimited flashing with AES-256 encryption, real-time monitoring, 99.9% success rate, and 24/7 support.",
} as const;

// -----------------------------------------------------------
// 2. ANA SAYFA İSTATİSTİKLERİ
// -----------------------------------------------------------
export const STATS = {
  usdtFlashed: "50M+",
  activeUsers: "10K+",
  successRate: "99.9%",
  support: "24/7",
  encryption: "AES-256",
  executionTime: "<3s",
  counterTarget: 50,   // HeroSection sayacının ulaşacağı değer (M+)
} as const;

// -----------------------------------------------------------
// 3. FİYATLANDIRMA
//    Değiştirmek için sadece buradaki sayıları güncelle.
//    Hem /checkout hem de /packages otomatik olarak yeni değerleri gösterir.
// -----------------------------------------------------------
export const PRICES: Record<string, Record<string, number>> = {
  "live-chat": { instant: 2 },
  demo:     { "1 hour": 40 },
  basic:    { "1 day": 100,   "7 days": 500,   "1 month": 1500  },
  infinity: { "1 day": 250,   "7 days": 750,   "1 month": 2500  },
  master:   { "1 day": 1500,  "7 days": 5000,  "1 month": 25000 },
};

// -----------------------------------------------------------
// 4. LİSANS PLANLARI
//    name, subtitle, özellikler ve tier limitleri burada.
// -----------------------------------------------------------
export const PLANS = [
  {
    key: "basic",
    name: "Basic",
    subtitle: "Perfect for getting started",
    featured: false,
    tiers: [
      { duration: "1 day",   durationKey: "1 day",   limit: "2k FlashTether"  },
      { duration: "7 days",  durationKey: "7 days",  limit: "10k FlashTether" },
      { duration: "1 month", durationKey: "1 month", limit: "50k FlashTether" },
    ],
    features: [
      "Flash up to 50k USDT",
      "Standard Flash Limits",
      "Email Support",
      "Basic Features",
      "Regular Updates",
      "370 days validity",
      "Step-by-Step Guide",
      "Telegram/WhatsApp Support",
    ],
  },
  {
    key: "infinity",
    name: "Premium",
    subtitle: "For growing operations",
    featured: false,
    tiers: [
      { duration: "1 day",   durationKey: "1 day",   limit: "15k FlashTether"  },
      { duration: "7 days",  durationKey: "7 days",  limit: "50k FlashTether"  },
      { duration: "1 month", durationKey: "1 month", limit: "150k FlashTether" },
    ],
    features: [
      "Flash up to 150k USDT",
      "High Flash Limits",
      "Premium Support",
      "Advanced Features",
      "370 days validity",
      "Priority Updates",
      "Step-by-Step Guide",
      "Priority WhatsApp/Telegram Support",
    ],
  },
  {
    key: "master",
    name: "Master",
    subtitle: "Enterprise-grade solution",
    featured: true,
    tiers: [
      { duration: "1 day",   durationKey: "1 day",   limit: "350k FlashTether" },
      { duration: "7 days",  durationKey: "7 days",  limit: "1M FlashTether"   },
      { duration: "1 month", durationKey: "1 month", limit: "50M FlashTether"  },
    ],
    features: [
      "Flash up to 50M USDT",
      "Highest Flash Limits",
      "Priority Support",
      "Unlimited Transfers",
      "Extended Validity (370 days)",
      "Instant Activation",
      "Step-by-Step Guide",
      "VIP WhatsApp/Telegram Support",
    ],
  },
] as const;

export const DEMO_PLAN = {
  key: "demo",
  features: [
    "Flash up to 750 USDT",
    "1 day Full Access",
    "Test All Features",
    "Instant Activation",
    "Email Support",
    "Telegram/WhatsApp Support",
    "Perfect for Testing",
  ],
} as const;

// -----------------------------------------------------------
// 5. KRİPTO ÖDEME ADRESLERİ  ← EN SIK GÜNCELLENECEK BÖLÜM
//    Her coin için kendi cüzdan adresini buraya yaz.
//    USDT için her ağ ayrı adrese sahip olabilir.
// -----------------------------------------------------------
export const CRYPTO_ADDRESSES: Record<string, string> = {
  BTC:             "bc1qln48c9k86x5a3y9mk5nq8eudz8l8es8520q5ch",
  ETH:             "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15",
  BNB:             "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15",
  TRX:             "TAdnG4GgWBbUZ1jfL966DWwm8PAqnADKAm",
  "USDT-ERC20":    "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15",
  "USDT-BEP20":    "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15",
  "USDT-TRC20":    "TAdnG4GgWBbUZ1jfL966DWwm8PAqnADKAm",
  "USDT-Polygon":  "0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15",
  "USDT-Avalanche":"0xDf1aE972Ae6beeA82312dAAC14a9EB66bFc7FD15",
};

// -----------------------------------------------------------
// 6. KRİPTO KUR YAKLAŞIKLARI (statik fallback)
//    Gerçek zamanlı kur API'si yokken kullanılır.
//    Checkout sayfasındaki "yaklaşık miktar" hesabı buradan beslenir.
//    Güncel tutmak için coinmarketcap/coingecko fiyatlarını buraya yaz.
// -----------------------------------------------------------
export const CRYPTO_RATES: Record<string, number> = {
  BTC:  98432,
  ETH:   3812,
  BNB:    421,
  TRX:  0.123,
  USDT:     1,
};

// -----------------------------------------------------------
// 7. ÖDEME AYARLARI
// -----------------------------------------------------------
export const PAYMENT = {
  windowSeconds: 600,   // Ödeme için verilen süre (saniye) — varsayılan 10 dk
} as const;
