import { NextRequest, NextResponse } from "next/server";
import { kvSet, kvDel, kvGet } from "@/lib/kv";

async function sendTelegram(token: string, chatId: string, text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
  } catch {}
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email  = searchParams.get("email") ?? "";
  const amount = parseFloat(searchParams.get("amount") ?? "0");
  const key    = searchParams.get("key") ?? "";
  const secret = process.env.ADMIN_SECRET ?? "changeme";

  if (key !== secret) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!email || !amount || amount <= 0) {
    return new NextResponse("Invalid parameters", { status: 400 });
  }

  // Get current confirmed balance (may already have some)
  const existing = await kvGet(`trx:confirmed:${email}`);
  const prev = existing ? parseFloat(existing) : 0;

  // Set confirmed balance
  await kvSet(`trx:confirmed:${email}`, String(amount));

  // Clear pending claim
  await kvDel(`trx:pending:${email}`);

  // Telegram confirmation to admin
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    const msg = [
      "✅ *TRX Bakiyesi Onaylandı*",
      "",
      `👤 *Kullanıcı:* \`${email}\``,
      `💰 *Onaylanan Bakiye:* ${amount.toLocaleString("tr-TR")} TRX`,
      prev > 0 ? `📊 *Önceki:* ${prev.toLocaleString("tr-TR")} TRX` : "",
      `🕐 ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}`,
    ].filter(Boolean).join("\n");
    await sendTelegram(token, chatId, msg);
  }

  // Return a clean HTML confirmation page
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TRX Onaylandı</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #080810; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem; }
    .card { background: #111120; border: 1px solid #1e1e30; border-radius: 1rem; padding: 2rem; max-width: 420px; width: 100%; text-align: center; }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    h1 { color: #4ade80; font-size: 1.25rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .amount { color: #fbbf24; font-size: 1.5rem; font-weight: bold; font-family: monospace; margin: 1rem 0; }
    .email { color: #e2e8f0; font-family: monospace; font-size: 0.85rem; background: #0d0d1c; padding: 0.5rem 1rem; border-radius: 0.5rem; display: inline-block; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✅</div>
    <h1>TRX Bakiyesi Onaylandı</h1>
    <p>Kullanıcı:</p>
    <div class="email">${email}</div>
    <div class="amount">${amount.toLocaleString("tr-TR")} TRX</div>
    <p>Bakiye güncellendi. Kullanıcı dashboard'ını yenilediğinde görecek.</p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
