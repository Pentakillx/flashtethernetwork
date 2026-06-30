import { NextRequest, NextResponse } from "next/server";
import { kvGet } from "@/lib/kv";

export async function GET(req: NextRequest) {
  const email = new URL(req.url).searchParams.get("email") ?? "";
  if (!email) return NextResponse.json({ balance: 0 });

  const val = await kvGet(`trx:confirmed:${email}`);
  const balance = val ? parseFloat(val) : 0;

  return NextResponse.json({ balance }, {
    headers: { "Cache-Control": "no-store" },
  });
}
