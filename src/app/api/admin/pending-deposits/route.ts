import { NextRequest, NextResponse } from "next/server";
import { kvKeys, kvGet } from "@/lib/kv";

export async function GET(req: NextRequest) {
  const key    = new URL(req.url).searchParams.get("key") ?? "";
  const secret = process.env.ADMIN_SECRET ?? "changeme";

  if (key !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const keys = await kvKeys("trx:pending:*");

  const pending = await Promise.all(
    keys.map(async (k) => {
      const raw = await kvGet(k);
      try { return raw ? JSON.parse(raw) as { email: string; claimedAmount: number; claimedAt: string } : null; }
      catch { return null; }
    })
  );

  return NextResponse.json({
    ok: true,
    pending: pending.filter(Boolean),
  });
}
