import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, reason: "telegram not configured" }, { status: 200 });
  }

  const body = await req.json() as {
    fullName: string;
    email: string;
    accountCode: string;
  };

  const message = [
    "👤 *Yeni Kayıt Bildirimi*",
    "",
    `👤 *Ad Soyad:* ${body.fullName}`,
    `📧 *E-posta:* ${body.email}`,
    `🎫 *Hesap Kodu:* \`${body.accountCode}\``,
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
      console.error("[notify-register] Telegram error:", data.description);
      return NextResponse.json({ ok: false, reason: data.description }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify-register] fetch failed:", err);
    return NextResponse.json({ ok: false, reason: "fetch error" }, { status: 200 });
  }
}
