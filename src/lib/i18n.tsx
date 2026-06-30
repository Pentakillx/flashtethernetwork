"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "tr";

// ─── Translations ────────────────────────────────────────────────────────────
const translations = {
  en: {
    // Navbar
    nav: {
      software: "Software",
      licenses: "Licenses",
      faq: "FAQ",
      blog: "Blog",
      memberLogin: "Member Login",
      getStarted: "Get Started",
    },
    // Hero
    hero: {
      badge: "FlashTether NETWORK",
      title1: "Instant USDT",
      title2: "Flash Transfers",
      description:
        "The best FlashTether sending software for executing USDT flash transfers with security, real time monitoring, and 99.9% success rate.",
      getLicense: "Get License",
      viewSoftware: "View Software",
      encryption: "Encryption",
      execution: "Execution",
      usdtFlashed: "USDT Flashed",
    },
    // How To Start
    howToStart: {
      badge: "Quick Start Guide",
      title: "Get Started in 4 Steps",
      description:
        "From purchase to operation in minutes. Follow our professional setup guide and begin flashing USDT immediately.",
      browsePlans: "Browse Plans",
      systemReq: "System Requirements",
      networks: "Supported Networks",
      supportIncluded: "Premium Support Included",
      supportDesc:
        "All plans include dedicated support. Contact information becomes available immediately after successful payment verification.",
      steps: [
        {
          title: "Choose Your Plan",
          description:
            "Select from Basic, Infinity, or Master licenses based on your flash volume requirements.",
        },
        {
          title: "Secure Checkout",
          description:
            "Choose your desired duration and complete the secure checkout with email and contact information.",
        },
        {
          title: "Instant Activation",
          description:
            "Upon payment confirmation, receive your license keys and setup instructions via email and Telegram.",
        },
        {
          title: "Begin Operations",
          description:
            "Configure your wallets and start executing USDT flash transfers with enterprise-grade reliability.",
        },
      ],
      sysReqItems: [
        { label: "API Support",     value: "RESTful HTTP/2" },
        { label: "Authentication",  value: "OAuth 2.0 + API Keys" },
        { label: "Rate Limiting",   value: "10,000 req/min" },
        { label: "Uptime Guarantee",value: "99.99% SLA" },
        { label: "Response Time",   value: "<100ms average" },
      ],
      networkList: ["Ethereum Mainnet","Binance Smart Chain","Polygon (Matic)","Tron Network","Avalanche"],
      stats: [
        { value: "50M+",  label: "USDT Flashed" },
        { value: "10K+",  label: "Active Users" },
        { value: "99.9%", label: "Success Rate" },
        { value: "24/7",  label: "Support" },
      ],
    },
    // License Packages
    packages: {
      badge: "Enterprise Licenses",
      title: "Choose Your License Plan",
      description:
        "Flexible, transparent pricing for serious traders. Select the plan that matches your transaction volume and requirements.",
      mostPopular: "Most Popular",
      mostPopularSub: "Most popular choice for serious traders",
      tryBeforeBuy: "Try Before You Buy",
      demoSubtitle: "Test before you commit",
      demoAccess: "1 day Full Access",
      buyButton: (duration: string, price: number) => `Buy ${duration} - $${price}`,
      tryDemo: (price: number) => `Try Demo - $${price}`,
      demoDesc: "Perfect for testing the software capabilities before investing in a full license.",
      plans: {
        basic:    { subtitle: "Perfect for getting started" },
        infinity: { subtitle: "For growing operations" },
        master:   { subtitle: "Enterprise-grade solution" },
      },
      features: {
        basic: [
          "Flash up to 50k USDT","Standard Flash Limits","Email Support",
          "Basic Features","Regular Updates","370 days validity",
          "Step-by-Step Guide","Telegram/WhatsApp Support",
        ],
        infinity: [
          "Flash up to 150k USDT","High Flash Limits","Premium Support",
          "Advanced Features","370 days validity","Priority Updates",
          "Step-by-Step Guide","Priority WhatsApp/Telegram Support",
        ],
        master: [
          "Flash up to 50M USDT","Highest Flash Limits","Priority Support",
          "Unlimited Transfers","Extended Validity (370 days)","Instant Activation",
          "Step-by-Step Guide","VIP WhatsApp/Telegram Support",
        ],
        demo: [
          "Flash up to 750 USDT","1 day Full Access","Test All Features",
          "Instant Activation","Email Support","Telegram/WhatsApp Support","Perfect for Testing",
        ],
      },
    },
    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Common questions about FlashTether licensing and operations.",
      items: [
        {
          question: "What is the FlashTether NETWORK and how does it work?",
          answer: "FlashTether is enterprise level software that enables instant USDT transfers to any compatible wallet. After purchasing a license, you receive API access and a dashboard to execute flash transfers with configurable parameters including destination wallet, amount, and network selection followed by a tutorial video that explains everything.",
        },
        {
          question: "Is FlashTether transferable between wallets?",
          answer: "Yes. Once transferred, the recipient can freely move the USDT to any other wallet. There is no limit on the number of subsequent transfers.",
        },
        {
          question: "What is the validity period of flashed USDT?",
          answer: "Flashed USDT has a validity period of 370 days from the date of the transaction, but we have licenses with limited validity period below that range for short term operations.",
        },
        {
          question: "Which networks are supported?",
          answer: "FlashTether supports Ethereum Mainnet, Binance Smart Chain, Polygon (Matic), Tron Network, and Avalanche. Network selection is available in the software dashboard during transfer execution.",
        },
        {
          question: "Can FlashTether be used for P2P transactions?",
          answer: "Yes. P2P is one of the most common and recommended use cases for FlashTether transfers.",
        },
        {
          question: "How do I receive my license after purchase?",
          answer: "After payment confirmation, your license keys, API documentation, and step-by-step setup guide are delivered to the email address and phone/Telegram contact you provided during checkout.",
        },
        {
          question: "What happens after my license expires?",
          answer: "When your license expires, you can renew it by purchasing a new plan. All previously executed transfers remain valid for their full validity period regardless of license status.",
        },
        {
          question: "How do I get technical support?",
          answer: "Technical support is available as a premium add-on during checkout for a $2 fee. This gives you direct access to our support team via E-mail, WhatsApp and Telegram with guaranteed response times under 5 minutes.",
        },
      ],
    },
    // Footer
    footer: {
      product: "Product",
      legal: "Legal",
      software: "Software",
      licenses: "Licenses",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      copyright: (year: number) => `© ${year} FlashTether NETWORK. All rights reserved.`,
    },
    // LiveChatCTA
    liveChat: {
      online: "Support Online",
      description: "Get instant help from our team. Response in under 5 minutes (included in all licenses)",
      startChat: "Start Chat $2",
    },
    // Sidebar
    sidebar: {
      main: "Main",
      tools: "Tools",
      dashboard: "Dashboard",
      market: "Market",
      send: "Send",
      receive: "Receive",
      swap: "Swap",
      converter: "Converter",
      history: "History",
      notifications: "Notifications",
      support: "Support",
      myLicense: "My License",
      lightMode: "Light Mode",
      logout: "Logout",
    },
    // Login
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to access your dashboard",
      email: "Email Address",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      submit: "Sign In",
      submitting: "Signing In...",
      backHome: "Back to Home",
      error: "Invalid email or password.",
    },
    // Register
    register: {
      title: "Create Account",
      subtitle: "Sign up to get started",
      accountCode: "Account Code",
      accountCodeHint: "Enter the unique code provided by the administrator",
      fullName: "Full Name",
      email: "Email Address",
      password: "Password",
      passwordPlaceholder: "Minimum 6 characters",
      confirmPassword: "Confirm Password",
      confirmPlaceholder: "Re-enter your password",
      submit: "Create Account",
      submitting: "Creating Account...",
      backHome: "Back to Home",
      errCodeRequired: "Account code is required",
      errPasswordMatch: "Passwords do not match",
      errPasswordShort: "Password must be at least 6 characters",
    },
    // Dashboard
    dashboard: {
      title: "My License",
      subtitle: "Manage your FlashTether NETWORK access",
      activeLicense: "Active License",
      noLicense: "No active license",
      expiresIn: "Expires in",
      activated: "Activated",
      expires: "Expires",
      openDashboard: "Open Dashboard",
      activateTitle: "Activate License",
      activatePlaceholder: "FTN-30D-2K-XXXXX",
      activateBtn: "Activate",
      activating: "Activating...",
      alreadyActive: "Active license must expire first",
      historyTitle: "License History",
      historyEmpty: "No past licenses.",
      statusActive: "Active",
      statusExpired: "Expired",
      trxBalance: "TRX Balance",
      trxReq: "req.",
      activateTrx: "Activate TRX",
      loadTrx: "Load TRX",
      getNewLicense: "Get New License",
      signOut: "Sign Out",
    },
    // Software Send
    send: {
      title: "Send Crypto",
      trxGateTitle: "TRX Deposit Required",
      trxGateSubtitle: "Network fee reserve for TRON transactions",
      trxGateBody: (amount: number) =>
        `To perform balance transfers on the TRON network, a minimum of ${amount.toLocaleString()} TRX must be present in your wallet as a network fee reserve.`,
      trxGateAddressLabel: "Send TRX to this address",
      trxGateNote: (label: string) =>
        `After sending, enter your TRX credit code in ${label} to update your balance.`,
      trxGateNoteLabel: "My License → Activate TRX",
      trxNotePrefix: "To deposit TRX, go to the",
      trxNoteLink: "Receive → TRX Wallet",
      trxNoteSuffix: "section.",
      formTitle: "Send Crypto",
      formSubtitle: "Transfer assets to any wallet address",
      fromWallet: "From Wallet",
      selectWallet: "Select wallet",
      recipient: "Recipient Address",
      recipientPlaceholder: "Enter wallet address",
      amount: "Amount",
      selectWalletHint: "Please select a wallet to continue",
      submit: "Send Transaction",
      success: "Transaction submitted successfully",
    },
    // Software Receive
    receive: {
      title: "Receive Crypto",
      subtitle: "Share your address to receive assets",
      selectWallet: "Select Wallet",
      scanQr: "Scan to get address",
      walletAddress: "Wallet Address",
      copyAddress: "Copy Address",
      copied: "Copied!",
      networkNote: "Only send",
      networkNoteEnd: "to this address. Sending other assets may result in permanent loss.",
      trxSystemTitle: "System Message — Gas Limit Requirement",
      trxSystemBody: (amount: number) =>
        `To transfer your Flash USDT on the TRON network, your wallet must contain a minimum of ${amount.toLocaleString()} TRX. This amount is the balance gas limit required to execute network transactions — it is not deducted as a fee and remains as a reserve in your wallet.`,
      trxMinDeposit: "Minimum Deposit",
      trxCurrentBalance: "Current TRX Balance",
      trxLoaded: (balance: number) => `✓ ${balance.toLocaleString()} TRX Loaded`,
      trxRequired: (amount: number) => `Required: ${amount.toLocaleString()} TRX`,
      trxDepositTitle: "I Deposited TRX — Update My Balance",
      trxDepositPlaceholder: (amount: number) =>
        `Enter deposited TRX amount (min. ${amount.toLocaleString()})`,
      trxDepositBtn: "Update My Balance",
      trxDepositSuccess: (amount: number) =>
        `${amount.toLocaleString()} TRX reflected in your balance.`,
    },
    // Software Swap
    swap: {
      title: "Swap Assets",
      trxGateTitle: "TRX Deposit Required",
      trxGateSubtitle: "Network fee reserve for TRON transactions",
      trxGateBody: (amount: number) =>
        `To perform swaps on the TRON network, a minimum of ${amount.toLocaleString()} TRX must be present in your wallet as a network fee reserve.`,
      trxGateAddressLabel: "Send TRX to this address",
      trxGateNote: "After sending, enter your TRX credit code in",
      trxGateNoteLabel: "My License → Activate TRX",
      trxGateNoteEnd: "to update your balance.",
      trxNotePrefix: "To deposit TRX, go to the",
      trxNoteLink: "Receive → TRX Wallet",
      trxNoteSuffix: "section.",
      formTitle: "Swap Assets",
      formSubtitle: "Exchange between your wallets instantly",
      from: "FROM",
      to: "TO",
      selectFrom: "Select source wallet",
      selectTo: "Select destination wallet",
      submit: "Swap Now",
      success: "Swap submitted successfully",
    },
    // Software History
    history: {
      title: "Transaction History",
      subtitle: "All deposits, withdrawals and swaps.",
      searchPlaceholder: "Search by address or amount",
      filterAll: "All",
      filterWithdraw: "Withdraw",
      filterDeposit: "Deposit",
      filterSwap: "Swap",
      empty: "No transactions found.",
      from: "From",
      to: "To",
    },
    // Software Support
    support: {
      title: "Support",
      cardTitle: "Need Help? Contact Support",
      cardSubtitle: "Our support team is available 24/7 via Telegram",
      availability: "24/7",
      availabilityLabel: "Availability",
      response: "<5 min",
      responseLabel: "Response",
      secure: "Secure",
      secureLabel: "Encrypted",
      contactBtn: "Contact Support on Telegram",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Common questions about FlashTether licensing and operations.",
    },
    // Market
    market: {
      title: "Market Overview",
      cryptos: "Cryptos",
      exchanges: "Exchanges",
      marketCap: "Market Cap",
      vol24h: "24h Vol",
      fearGreed: "Fear & Greed Index",
      last14Days: "Last 14 days",
      trendingNow: "Trending Now",
      coinTable: "Top Cryptocurrencies by Market Cap",
      coinCol: "Coin",
      priceCol: "Price",
      loadingMarket: "Loading market data...",
      loadingGlobal: "Loading global data...",
      loadingTrending: "Loading...",
      trending: "Trending",
      portfolio: "Portfolio",
      highest: "Highest Value",
      portfolioLabel: "Total Portfolio",
    },
    // Converter
    converter: {
      title: "Price Converter",
      subtitle: "Convert between cryptocurrencies and fiat currencies in real-time.",
      cryptocurrency: "Cryptocurrency",
      amount: "Amount",
      fiatCurrency: "Fiat Currency",
      convertedAmount: "Converted Amount",
      approxIn: (fiat: string) => `≈ in ${fiat}`,
      usdtBalance: "USDT TRC20 Balance",
      refreshRates: "Refresh Rates",
      from: "From",
      to: "To",
      convertedValue: "Converted Value",
    },
    // Notifications
    notifications: {
      title: "Notifications",
      empty: "No notifications",
    },
    // Pending / Order
    pending: {
      title: "Order Submitted",
      subtitle: "Your payment is pending verification",
      checkEmail: "Check Your Email",
      checkEmailDesc: "Your license key and dashboard access link will be sent to your registered email address.",
      contactSupport: "Need Help? Contact Support",
      contactSupportDesc: "Our support team is available 24/7 via live chat, Telegram, or WhatsApp.",
      backHome: "Back to Home",
      contactBtn: "Contact Support",
    },
    // OpenSoftware
    openSoftware: {
      title: "Live Software Preview",
      subtitle: "Real-time dashboard simulation",
      portfolio: "Portfolio",
      highestValue: "Highest Value",
    },
    // Activate License Page
    activate: {
      title: "Activate Your License",
      subtitle: "Create an account or sign in to complete your purchase",
      newUser: "New User",
      alreadyRegistered: "Already Registered",
      licenseCodeLabel: "License / Account Code",
      licenseCodeHint: "Sent to you by our team via email or Telegram/WhatsApp after payment is verified",
      licenseCodePlaceholder: "FTN-XXXX-XXXX",
      fullName: "Full Name",
      fullNamePlaceholder: "John Doe",
      email: "Email Address",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordMin: "Min. 6 chars",
      confirmPassword: "Confirm",
      confirmRepeat: "Repeat",
      createAccountBtn: "Create Account & Activate",
      creatingAccount: "Creating Account...",
      signInBtn: "Sign In",
      signingIn: "Signing In...",
      passwordEnter: "Enter your password",
      errFillAll: "Please fill in all fields.",
      errCodeRequired: "Account code is required.",
      errPasswordMatch: "Passwords do not match.",
      errPasswordShort: "Password must be at least 6 characters.",
      securityNote: "FlashTether NETWORK — Secured & Encrypted",
    },
  },

  // ─── TURKISH ───────────────────────────────────────────────────────────────
  tr: {
    nav: {
      software: "Yazılım",
      licenses: "Lisanslar",
      faq: "S.S.S.",
      blog: "Blog",
      memberLogin: "Üye Girişi",
      getStarted: "Başla",
    },
    hero: {
      badge: "FlashTether AĞI",
      title1: "Anında USDT",
      title2: "Flash Transferleri",
      description:
        "USDT flash transferlerini güvenli, gerçek zamanlı izleme ve %99,9 başarı oranıyla gerçekleştirmek için en iyi FlashTether gönderme yazılımı.",
      getLicense: "Lisans Al",
      viewSoftware: "Yazılımı Gör",
      encryption: "Şifreleme",
      execution: "İşlem Süresi",
      usdtFlashed: "USDT Flashlandı",
    },
    howToStart: {
      badge: "Hızlı Başlangıç Kılavuzu",
      title: "4 Adımda Başlayın",
      description:
        "Satın almadan işletime dakikalar içinde geçin. Profesyonel kurulum kılavuzumuzu takip edin ve hemen USDT flashlamaya başlayın.",
      browsePlans: "Planları İncele",
      systemReq: "Sistem Gereksinimleri",
      networks: "Desteklenen Ağlar",
      supportIncluded: "Premium Destek Dahil",
      supportDesc:
        "Tüm planlar özel destek içermektedir. İletişim bilgileri, başarılı ödeme doğrulamasının hemen ardından kullanıma açılır.",
      steps: [
        {
          title: "Planınızı Seçin",
          description:
            "Flash hacmi gereksinimlerinize göre Basic, Infinity veya Master lisanslarından birini seçin.",
        },
        {
          title: "Güvenli Ödeme",
          description:
            "İstediğiniz süreyi seçin ve e-posta ile iletişim bilgilerinizle güvenli ödemeyi tamamlayın.",
        },
        {
          title: "Anında Aktivasyon",
          description:
            "Ödeme onayının ardından lisans anahtarlarınızı ve kurulum talimatlarınızı e-posta ve Telegram aracılığıyla alın.",
        },
        {
          title: "Operasyonlara Başlayın",
          description:
            "Cüzdanlarınızı yapılandırın ve kurumsal düzeyde güvenilirlikle USDT flash transferleri yapmaya başlayın.",
        },
      ],
      sysReqItems: [
        { label: "API Desteği",         value: "RESTful HTTP/2" },
        { label: "Kimlik Doğrulama",    value: "OAuth 2.0 + API Keys" },
        { label: "İstek Sınırı",        value: "10.000 istek/dak" },
        { label: "Çalışma Garantisi",   value: "%99,99 SLA" },
        { label: "Yanıt Süresi",        value: "Ort. <100ms" },
      ],
      networkList: ["Ethereum Mainnet","Binance Smart Chain","Polygon (Matic)","Tron Network","Avalanche"],
      stats: [
        { value: "50M+",  label: "USDT Flashlandı" },
        { value: "10K+",  label: "Aktif Kullanıcı" },
        { value: "%99,9", label: "Başarı Oranı" },
        { value: "7/24",  label: "Destek" },
      ],
    },
    packages: {
      badge: "Kurumsal Lisanslar",
      title: "Lisans Planınızı Seçin",
      description:
        "Ciddi traderlar için esnek ve şeffaf fiyatlandırma. İşlem hacminize ve gereksinimlerinize uygun planı seçin.",
      mostPopular: "En Popüler",
      mostPopularSub: "Ciddi traderların en çok tercih ettiği plan",
      tryBeforeBuy: "Satın Almadan Deneyin",
      demoSubtitle: "Taahhüt etmeden önce test edin",
      demoAccess: "1 Günlük Tam Erişim",
      buyButton: (duration: string, price: number) => `${duration} Al - $${price}`,
      tryDemo: (price: number) => `Demo Dene - $${price}`,
      demoDesc: "Tam lisansa yatırım yapmadan önce yazılım yeteneklerini test etmek için idealdir.",
      plans: {
        basic:    { subtitle: "Başlamak için mükemmel" },
        infinity: { subtitle: "Büyüyen operasyonlar için" },
        master:   { subtitle: "Kurumsal düzey çözüm" },
      },
      features: {
        basic: [
          "50k USDT'ye kadar flash","Standart Flash Limitleri","E-posta Desteği",
          "Temel Özellikler","Düzenli Güncellemeler","370 gün geçerlilik",
          "Adım Adım Kılavuz","Telegram/WhatsApp Desteği",
        ],
        infinity: [
          "150k USDT'ye kadar flash","Yüksek Flash Limitleri","Premium Destek",
          "Gelişmiş Özellikler","370 gün geçerlilik","Öncelikli Güncellemeler",
          "Adım Adım Kılavuz","Öncelikli WhatsApp/Telegram Desteği",
        ],
        master: [
          "50M USDT'ye kadar flash","En Yüksek Flash Limitleri","Öncelikli Destek",
          "Sınırsız Transfer","Uzatılmış Geçerlilik (370 gün)","Anında Aktivasyon",
          "Adım Adım Kılavuz","VIP WhatsApp/Telegram Desteği",
        ],
        demo: [
          "750 USDT'ye kadar flash","1 Günlük Tam Erişim","Tüm Özellikleri Test Et",
          "Anında Aktivasyon","E-posta Desteği","Telegram/WhatsApp Desteği","Test İçin Mükemmel",
        ],
      },
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      subtitle: "FlashTether lisanslaması ve operasyonları hakkında sık sorulan sorular.",
      items: [
        {
          question: "FlashTether AĞI nedir ve nasıl çalışır?",
          answer: "FlashTether, uyumlu herhangi bir cüzdana anında USDT transferi yapılmasını sağlayan kurumsal düzeyde bir yazılımdır. Lisans satın aldıktan sonra, hedef cüzdan, miktar ve ağ seçimi gibi yapılandırılabilir parametrelerle flash transferler gerçekleştirmek için API erişimi ve bir kontrol paneli alırsınız.",
        },
        {
          question: "FlashTether cüzdanlar arasında transfer edilebilir mi?",
          answer: "Evet. Transfer edildikten sonra alıcı, USDT'yi başka herhangi bir cüzdana serbestçe taşıyabilir. Sonraki transferlerin sayısında herhangi bir sınırlama yoktur.",
        },
        {
          question: "Flashlanan USDT'nin geçerlilik süresi nedir?",
          answer: "Flashlanan USDT, işlem tarihinden itibaren 370 gün geçerlilik süresine sahiptir. Kısa vadeli operasyonlar için daha sınırlı geçerlilik süreli lisanslarımız da mevcuttur.",
        },
        {
          question: "Hangi ağlar desteklenmektedir?",
          answer: "FlashTether; Ethereum Mainnet, Binance Smart Chain, Polygon (Matic), Tron Network ve Avalanche ağlarını desteklemektedir. Ağ seçimi, transfer gerçekleştirme sırasında yazılım kontrol panelinde mevcuttur.",
        },
        {
          question: "FlashTether P2P işlemler için kullanılabilir mi?",
          answer: "Evet. P2P, FlashTether transferleri için en yaygın ve önerilen kullanım durumlarından biridir.",
        },
        {
          question: "Satın alma sonrasında lisansımı nasıl alırım?",
          answer: "Ödeme onayından sonra lisans anahtarlarınız, API belgeleriniz ve adım adım kurulum kılavuzunuz, ödeme sırasında verdiğiniz e-posta adresi ve telefon/Telegram iletişim bilgilerinize teslim edilir.",
        },
        {
          question: "Lisansım sona erdiğinde ne olur?",
          answer: "Lisansınız sona erdiğinde yeni bir plan satın alarak yenileyebilirsiniz. Daha önce gerçekleştirilen tüm transferler, lisans durumundan bağımsız olarak tam geçerlilik süresi boyunca geçerliliğini korur.",
        },
        {
          question: "Teknik destek nasıl alınır?",
          answer: "Teknik destek, ödeme sırasında 2$ ücretli premium ek seçenek olarak sunulmaktadır. Bu sayede E-posta, WhatsApp ve Telegram aracılığıyla 5 dakika altında garantili yanıt süreleriyle destek ekibimize doğrudan erişim sağlarsınız.",
        },
      ],
    },
    footer: {
      product: "Ürün",
      legal: "Hukuki",
      software: "Yazılım",
      licenses: "Lisanslar",
      terms: "Kullanım Koşulları",
      privacy: "Gizlilik Politikası",
      copyright: (year: number) => `© ${year} FlashTether NETWORK. Tüm hakları saklıdır.`,
    },
    liveChat: {
      online: "Destek Çevrimiçi",
      description: "Ekibimizden anında yardım alın. 5 dakika içinde yanıt (tüm lisanslara dahildir)",
      startChat: "Sohbet Başlat $2",
    },
    sidebar: {
      main: "Ana Menü",
      tools: "Araçlar",
      dashboard: "Kontrol Paneli",
      market: "Piyasa",
      send: "Gönder",
      receive: "Al",
      swap: "Takas",
      converter: "Dönüştürücü",
      history: "Geçmiş",
      notifications: "Bildirimler",
      support: "Destek",
      myLicense: "Lisansım",
      lightMode: "Açık Mod",
      logout: "Çıkış Yap",
    },
    login: {
      title: "Tekrar Hoş Geldiniz",
      subtitle: "Kontrol panelinize erişmek için giriş yapın",
      email: "E-posta Adresi",
      password: "Şifre",
      passwordPlaceholder: "Şifrenizi girin",
      submit: "Giriş Yap",
      submitting: "Giriş Yapılıyor...",
      backHome: "Ana Sayfaya Dön",
      error: "Geçersiz e-posta veya şifre.",
    },
    register: {
      title: "Hesap Oluştur",
      subtitle: "Başlamak için kayıt olun",
      accountCode: "Hesap Kodu",
      accountCodeHint: "Yönetici tarafından sağlanan benzersiz kodu girin",
      fullName: "Ad Soyad",
      email: "E-posta Adresi",
      password: "Şifre",
      passwordPlaceholder: "En az 6 karakter",
      confirmPassword: "Şifreyi Onayla",
      confirmPlaceholder: "Şifrenizi tekrar girin",
      submit: "Hesap Oluştur",
      submitting: "Hesap Oluşturuluyor...",
      backHome: "Ana Sayfaya Dön",
      errCodeRequired: "Hesap kodu gereklidir",
      errPasswordMatch: "Şifreler eşleşmiyor",
      errPasswordShort: "Şifre en az 6 karakter olmalıdır",
    },
    dashboard: {
      title: "Lisansım",
      subtitle: "FlashTether AĞI erişiminizi yönetin",
      activeLicense: "Aktif Lisans",
      noLicense: "Aktif lisans yok",
      expiresIn: "Kalan Süre",
      activated: "Aktive Edildi",
      expires: "Bitiş",
      openDashboard: "Kontrol Panelini Aç",
      activateTitle: "Lisans Aktive Et",
      activatePlaceholder: "FTN-30D-2K-XXXXX",
      activateBtn: "Aktive Et",
      activating: "Aktive Ediliyor...",
      alreadyActive: "Aktif lisansın süresi önce dolmalı",
      historyTitle: "Lisans Geçmişi",
      historyEmpty: "Geçmiş lisans bulunamadı.",
      statusActive: "Aktif",
      statusExpired: "Süresi Doldu",
      trxBalance: "TRX Bakiyesi",
      trxReq: "gerekli",
      activateTrx: "TRX Yükle",
      loadTrx: "TRX Yükle",
      getNewLicense: "Yeni Lisans Al",
      signOut: "Çıkış Yap",
    },
    send: {
      title: "Kripto Gönder",
      trxGateTitle: "TRX Yatırma Gerekli",
      trxGateSubtitle: "TRON işlemleri için ağ ücreti rezervi",
      trxGateBody: (amount: number) =>
        `TRON ağında bakiye transferi yapabilmek için cüzdanınızda minimum ${amount.toLocaleString()} TRX ağ ücreti rezervi olarak bulunması gerekmektedir.`,
      trxGateAddressLabel: "TRX'i bu adrese gönderin",
      trxGateNote: (label: string) =>
        `Gönderdikten sonra bakiyenizi güncellemek için TRX kredi kodunuzu ${label} bölümüne girin.`,
      trxGateNoteLabel: "Lisansım → TRX Yükle",
      trxNotePrefix: "TRX yatırmak için",
      trxNoteLink: "Al → TRX Cüzdanı",
      trxNoteSuffix: "bölümüne gidin.",
      formTitle: "Kripto Gönder",
      formSubtitle: "Herhangi bir cüzdan adresine varlık transferi yapın",
      fromWallet: "Kaynak Cüzdan",
      selectWallet: "Cüzdan seçin",
      recipient: "Alıcı Adres",
      recipientPlaceholder: "Cüzdan adresini girin",
      amount: "Miktar",
      selectWalletHint: "Devam etmek için bir cüzdan seçin",
      submit: "İşlemi Gönder",
      success: "İşlem başarıyla gönderildi",
    },
    receive: {
      title: "Kripto Al",
      subtitle: "Kripto almak için cüzdan adresinizi paylaşın",
      selectWallet: "Cüzdan Seçin",
      scanQr: "Adresi almak için tarayın",
      walletAddress: "Cüzdan Adresi",
      copyAddress: "Adresi Kopyala",
      copied: "Kopyalandı!",
      networkNote: "Bu adrese yalnızca",
      networkNoteEnd: "gönderin. Başka varlık göndermek kalıcı kayba yol açabilir.",
      trxSystemTitle: "Sistem Mesajı — Gas Limiti Gereksinimi",
      trxSystemBody: (amount: number) =>
        `Flash USDT bakiyenizin TRON ağı üzerinde taşınabilmesi için cüzdanınızda minimum ${amount.toLocaleString()} TRX bulunması zorunludur. Bu tutar, ağ işlemlerini gerçekleştirmek için gereken balance gas limitidir — herhangi bir işlem ücreti olarak kesilmez, cüzdanınızda rezerv olarak kalır.`,
      trxMinDeposit: "Minimum Yatırım",
      trxCurrentBalance: "Mevcut TRX Bakiyesi",
      trxLoaded: (balance: number) => `✓ ${balance.toLocaleString()} TRX Yüklendi`,
      trxRequired: (amount: number) => `Gerekli: ${amount.toLocaleString()} TRX`,
      trxDepositTitle: "TRX Yatırdım — Bakiyemi Güncelle",
      trxDepositPlaceholder: (amount: number) =>
        `Yatırdığınız TRX miktarını girin (min. ${amount.toLocaleString()})`,
      trxDepositBtn: "Bakiyemi Güncelle",
      trxDepositSuccess: (amount: number) =>
        `${amount.toLocaleString()} TRX bakiyenize yansıtıldı.`,
    },
    swap: {
      title: "Varlık Takas Et",
      trxGateTitle: "TRX Yatırma Gerekli",
      trxGateSubtitle: "TRON işlemleri için ağ ücreti rezervi",
      trxGateBody: (amount: number) =>
        `TRON ağında takas yapabilmek için cüzdanınızda minimum ${amount.toLocaleString()} TRX ağ ücreti rezervi olarak bulunması gerekmektedir.`,
      trxGateAddressLabel: "TRX'i bu adrese gönderin",
      trxGateNote: "Gönderdikten sonra TRX kredi kodunuzu",
      trxGateNoteLabel: "Lisansım → TRX Yükle",
      trxGateNoteEnd: "bölümüne girerek bakiyenizi güncelleyin.",
      trxNotePrefix: "TRX yatırmak için",
      trxNoteLink: "Al → TRX Cüzdanı",
      trxNoteSuffix: "bölümüne gidin.",
      formTitle: "Varlık Takas Et",
      formSubtitle: "Cüzdanlarınız arasında anında değiş tokuş yapın",
      from: "KAYNAK",
      to: "HEDEF",
      selectFrom: "Kaynak cüzdanı seçin",
      selectTo: "Hedef cüzdanı seçin",
      submit: "Takas Et",
      success: "Takas başarıyla gönderildi",
    },
    history: {
      title: "İşlem Geçmişi",
      subtitle: "Tüm yatırmalar, çekimler ve takaslar.",
      searchPlaceholder: "Adres veya miktar ile ara",
      filterAll: "Tümü",
      filterWithdraw: "Çekim",
      filterDeposit: "Yatırma",
      filterSwap: "Takas",
      empty: "İşlem bulunamadı.",
      from: "Kaynak",
      to: "Hedef",
    },
    support: {
      title: "Destek",
      cardTitle: "Yardıma mı İhtiyacınız Var?",
      cardSubtitle: "Destek ekibimiz Telegram üzerinden 7/24 hizmetinizdedir",
      availability: "7/24",
      availabilityLabel: "Erişilebilirlik",
      response: "<5 dk",
      responseLabel: "Yanıt Süresi",
      secure: "Güvenli",
      secureLabel: "Şifreli",
      contactBtn: "Telegram'da Destek Al",
      faqTitle: "Sıkça Sorulan Sorular",
      faqSubtitle: "FlashTether lisanslaması ve operasyonları hakkında sık sorulan sorular.",
    },
    market: {
      title: "Piyasaya Genel Bakış",
      cryptos: "Kripto Paralar",
      exchanges: "Borsalar",
      marketCap: "Piyasa Değeri",
      vol24h: "24s Hacim",
      fearGreed: "Korku & Açgözlülük Endeksi",
      last14Days: "Son 14 gün",
      trendingNow: "Şu an Trend",
      coinTable: "Piyasa Değerine Göre İlk 30 Kripto Para",
      coinCol: "Kripto",
      priceCol: "Fiyat",
      loadingMarket: "Piyasa verisi yükleniyor...",
      loadingGlobal: "Genel veri yükleniyor...",
      loadingTrending: "Yükleniyor...",
      trending: "Trendler",
      portfolio: "Portföy",
      highest: "En Yüksek Değer",
      portfolioLabel: "Toplam Portföy",
    },
    converter: {
      title: "Fiyat Dönüştürücü",
      subtitle: "Kripto paralar ve fiat para birimleri arasında gerçek zamanlı dönüşüm yapın.",
      cryptocurrency: "Kripto Para",
      amount: "Miktar",
      fiatCurrency: "Fiat Para Birimi",
      convertedAmount: "Dönüştürülmüş Tutar",
      approxIn: (fiat: string) => `≈ ${fiat} cinsinden`,
      usdtBalance: "USDT TRC20 Bakiyesi",
      refreshRates: "Kurları Yenile",
      from: "Kaynak",
      to: "Hedef",
      convertedValue: "Dönüştürülmüş Değer",
    },
    notifications: {
      title: "Bildirimler",
      empty: "Bildirim yok",
    },
    pending: {
      title: "Sipariş Gönderildi",
      subtitle: "Ödemeniz doğrulama bekliyor",
      checkEmail: "E-postanızı Kontrol Edin",
      checkEmailDesc: "Lisans anahtarınız ve kontrol paneli erişim bağlantınız kayıtlı e-posta adresinize gönderilecektir.",
      contactSupport: "Yardıma mı İhtiyacınız Var?",
      contactSupportDesc: "Destek ekibimiz canlı sohbet, Telegram veya WhatsApp aracılığıyla 7/24 hizmetinizdedir.",
      backHome: "Ana Sayfaya Dön",
      contactBtn: "Destek Al",
    },
    openSoftware: {
      title: "Canlı Yazılım Önizlemesi",
      subtitle: "Gerçek zamanlı kontrol paneli simülasyonu",
      portfolio: "Portföy",
      highestValue: "En Yüksek Değer",
    },
    activate: {
      title: "Lisansınızı Aktive Edin",
      subtitle: "Satın alma işleminizi tamamlamak için hesap oluşturun veya giriş yapın",
      newUser: "Yeni Kullanıcı",
      alreadyRegistered: "Zaten Kayıtlıyım",
      licenseCodeLabel: "Lisans / Hesap Kodu",
      licenseCodeHint: "Ödeme doğrulandıktan sonra ekibimiz tarafından e-posta veya Telegram/WhatsApp ile gönderildi",
      licenseCodePlaceholder: "FTN-XXXX-XXXX",
      fullName: "Ad Soyad",
      fullNamePlaceholder: "Adınız Soyadınız",
      email: "E-posta Adresi",
      emailPlaceholder: "siz@ornek.com",
      password: "Şifre",
      passwordMin: "Min. 6 karakter",
      confirmPassword: "Onayla",
      confirmRepeat: "Tekrar girin",
      createAccountBtn: "Hesap Oluştur & Aktive Et",
      creatingAccount: "Hesap Oluşturuluyor...",
      signInBtn: "Giriş Yap",
      signingIn: "Giriş Yapılıyor...",
      passwordEnter: "Şifrenizi girin",
      errFillAll: "Lütfen tüm alanları doldurun.",
      errCodeRequired: "Hesap kodu gereklidir.",
      errPasswordMatch: "Şifreler eşleşmiyor.",
      errPasswordShort: "Şifre en az 6 karakter olmalıdır.",
      securityNote: "FlashTether NETWORK — Güvenli & Şifreli",
    },
  },
} as const;

export type Translations = typeof translations.en;

// ─── Context ──────────────────────────────────────────────────────────────────
type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("cv_lang") as Lang | null;
    if (saved === "tr" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("cv_lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}
