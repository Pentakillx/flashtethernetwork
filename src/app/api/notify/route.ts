import { NextRequest, NextResponse } from "next/server";

function generateLicenseCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `FTN-${part(4)}-${part(4)}`;
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
  const licenseCode = generateLicenseCode();

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
