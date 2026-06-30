import { NextRequest, NextResponse } from "next/server";
import { kvSet } from "@/lib/kv";

async function sendTelegram(token: string, chatId: string, text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown", disable_web_page_preview: true }),
    });
  } catch {}
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { email: string; amount: number };
  const { email, amount } = body;

  if (!email || !amount || amount <= 0) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Store pending claim in KV: trx:pending:{email} → JSON string
  await kvSet(`trx:pending:${email}`, JSON.stringify({
    email,
    claimedAmount: amount,
    claimedAt: new Date().toISOString(),
  }));

  // Send Telegram notification to admin
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const secret = process.env.ADMIN_SECRET ?? "changeme";
  const origin = new URL(req.url).origin;

  const confirmLink = `${origin}/api/admin/confirm-trx?email=${encodeURIComponent(email)}&amount=${amount}&key=${secret}`;
  const adminPanel  = `${origin}/admin`;

  if (token && chatId) {
    const msg = [
      "💰 *TRX Yatırım Bildirimi*",
      "",
      `👤 *Kullanıcı:* \`${email}\``,
      `💸 *Talep Edilen Tutar:* ${amount.toLocaleString("tr-TR")} TRX`,
      `🕐 ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}`,
      "",
      "─────────────────────────",
      "✅ *Tutarı onaylamak için:*",
      `[Onayla — ${amount.toLocaleString("tr-TR")} TRX](${confirmLink})`,
      "",
      "📝 *Farklı miktar onaylamak için:*",
      `Linkteki \`amount=\` değerini değiştirin:`,
      `\`${confirmLink.replace(`amount=${amount}`, "amount=YENI_MIKTAR")}\``,
      "",
      `🔧 [Admin Paneli](${adminPanel})`,
      "─────────────────────────",
    ].join("\n");

    await sendTelegram(token, chatId, msg);
  }

  return NextResponse.json({ ok: true, status: "pending" });
}
