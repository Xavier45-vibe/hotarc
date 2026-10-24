import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { validateContact } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { notifier } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, drop silently.
  if ((body as { website?: string })?.website) {
    return NextResponse.json({ ok: true, ref: "ok" });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const ref = randomUUID().slice(0, 8).toUpperCase();
  try {
    await notifier.send(result.data, ref);
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't send that. Please try again." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, ref });
}
