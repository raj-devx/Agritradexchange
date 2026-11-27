import { NextResponse } from "next/server";
import { headers } from "next/headers";

type Entry = { count: number; resetAt: number };

const stores = new Map<string, Map<string, Entry>>();

function getStore(name: string): Map<string, Entry> {
  let store = stores.get(name);
  if (!store) {
    store = new Map();
    stores.set(name, store);
  }
  return store;
}

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const store of stores.values()) {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
  }
}

export function rateLimit(opts: {
  name: string;
  windowSec?: number;
  max?: number;
}): () => Promise<NextResponse | null> {
  const windowMs = (opts.windowSec ?? 60) * 1000;
  const max = opts.max ?? 10;
  const store = getStore(opts.name);

  return async (): Promise<NextResponse | null> => {
    cleanup();
    const hdrs = await headers();
    const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || entry.resetAt <= now) {
      store.set(ip, { count: 1, resetAt: now + windowMs });
      return null;
    }

    entry.count++;
    if (entry.count > max) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    return null;
  };
}
