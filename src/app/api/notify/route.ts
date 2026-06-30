import { NextRequest, NextResponse } from "next/server";

// Plan + duration → [daysCode, balanceCode]
const PLAN_TIER_MAP: Record<string, Record<string, [string, string]>> = {
  basic:    { "1 day": ["1D",  "2K"],   "7 days": ["7D",  "10K"],  "1 month": ["30D", "50K"]  },
  infinity: { "1 day": ["1D",  "15K"],  "7 days": ["7D",  "50K"],  "1 month": ["30D", "150K"] },
  master:   { "1 day": ["1D",  "350K"], "7 days": ["7D",  "1M"],   "1 month": ["30D", "50M"]  },
  demo:     { "1 hour": ["1D", "750"] },
};

function generateLicenseCode(planKey: string, duration: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand5 = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const tier = PLAN_TIER_MAP[planKey]?.[duration];
  if (!tier) {
    // Fallback for unknown plans — basic format
    return `FTN-30D-2K-${rand5}`;
  }
  return `FTN-${tier[0]}-${tier[1]}-${rand5}`;
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // .env ayarlı değilse sessizce geç — kullanıcı akışı bozulmasın
    return NextResponse.json({ ok: false, reason: "telegram not configured" }, { status: 200 });
  }

  const body = await req.json() as {
    orderId: string;
    plan: string;
    duration: string;
    amount: number;
    email: string;
    phone: string;
    crypto: string;
    chain: string;
    address: string;
  };

  const chain = body.chain ? ` (${body.chain})` : "";
  const paymentMethod = `${body.crypto}${chain}`;
  const licenseCode = generateLicenseCode(body.plan, body.duration);

  const message = [
    "🔔 *Yeni Ödeme Bildirimi*",
    "",
    `📦 *Plan:* ${body.plan} — ${body.duration}`,
    `💵 *Tutar:* $${body.amount}`,
    `💳 *Ödeme Yöntemi:* ${paymentMethod}`,
    `📧 *E-posta:* ${body.email}`,
    `📱 *WhatsApp/Telegram:* ${body.phone}`,
    `🪙 *Gönderilecek Adres:* \`${body.address}\``,
    `🆔 *Sipariş ID:* \`${body.orderId}\``,
    "",
    "─────────────────────────",
    "🎫 *ÖNERİLEN LİSANS KODU*",
    `\`${licenseCode}\``,
    "👆 Bu kodu ödemeyi doğruladıktan sonra kullanıcıya gönderin.",
    "─────────────────────────",
    "",
    `🕐 ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}`,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await res.json() as { ok: boolean; description?: string };

    if (!data.ok) {
      console.error("[notify] Telegram error:", data.description);
      return NextResponse.json({ ok: false, reason: data.description }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify] fetch failed:", err);
    // Hata olsa bile kullanıcıya 500 dönme — akışı kesme
    return NextResponse.json({ ok: false, reason: "fetch error" }, { status: 200 });
  }
}
