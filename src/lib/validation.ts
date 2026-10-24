export type ContactPayload = {
  topic: "general" | "sample" | "order";
  name: string;
  email: string;
  message: string;
  address?: string;
  consent: boolean;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Partial<Record<keyof ContactPayload, string>> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = ["general", "sample", "order"] as const;

// Shared by client (instant feedback) and server (source of truth).
export function validateContact(input: unknown): ValidationResult {
  const o = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  const topic = TOPICS.includes(o.topic as never)
    ? (o.topic as ContactPayload["topic"])
    : "general";
  const name = str(o.name);
  const email = str(o.email);
  const message = str(o.message);
  const address = str(o.address);
  const consent = o.consent === true;

  if (name.length < 2 || name.length > 100) errors.name = "Please enter your name.";
  if (!EMAIL.test(email) || email.length > 200) errors.email = "Please enter a valid email.";
  if (topic === "sample" && address.length < 8)
    errors.address = "We need a delivery address to ship your sample.";
  if (topic !== "sample" && message.length < 10)
    errors.message = "Tell us a little more (10+ characters).";
  if (message.length > 2000) errors.message = "Message is too long (max 2000).";
  if (address.length > 300) errors.address = "Address is too long.";
  if (!consent) errors.consent = "Please accept the privacy policy to continue.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { topic, name, email, message, address, consent } };
}
