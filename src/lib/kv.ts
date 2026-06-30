/**
 * KV abstraction — Upstash/Vercel KV REST API (production)
 *                   + local JSON file fallback (development)
 *
 * Production: set KV_REST_API_URL + KV_REST_API_TOKEN in environment.
 * Local dev:  falls back to .local-kv.json in project root automatically.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const KV_URL   = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

// ─── Local file fallback (dev only) ──────────────────────────────────────────

function localPath() {
  return join(process.cwd(), ".local-kv.json");
}

function localRead(): Record<string, string> {
  try { return JSON.parse(readFileSync(localPath(), "utf-8")); }
  catch { return {}; }
}

function localWrite(store: Record<string, string>) {
  try { writeFileSync(localPath(), JSON.stringify(store, null, 2)); }
  catch {}
}

// ─── Upstash REST command ─────────────────────────────────────────────────────

async function upstash(...args: (string | number)[]): Promise<unknown> {
  const res = await fetch(KV_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const data = await res.json() as { result: unknown };
  return data.result;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function kvGet(key: string): Promise<string | null> {
  if (KV_URL && KV_TOKEN) {
    const result = await upstash("GET", key);
    return result as string | null;
  }
  return localRead()[key] ?? null;
}

export async function kvSet(key: string, value: string): Promise<void> {
  if (KV_URL && KV_TOKEN) {
    await upstash("SET", key, value);
    return;
  }
  const store = localRead();
  store[key] = value;
  localWrite(store);
}

export async function kvDel(key: string): Promise<void> {
  if (KV_URL && KV_TOKEN) {
    await upstash("DEL", key);
    return;
  }
  const store = localRead();
  delete store[key];
  localWrite(store);
}

/** Returns all keys matching a glob pattern (e.g. "trx:pending:*") */
export async function kvKeys(pattern: string): Promise<string[]> {
  if (KV_URL && KV_TOKEN) {
    const result = await upstash("KEYS", pattern);
    return (result as string[]) ?? [];
  }
  const store = localRead();
  const regex = new RegExp("^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
  return Object.keys(store).filter((k) => regex.test(k));
}
