"use client";

import Link from "next/link";
import { useState } from "react";
import { validateContact, type ContactPayload } from "@/lib/validation";

type Errors = Partial<Record<keyof ContactPayload, string>>;
const topics = [
  { v: "sample", l: "Free sample" },
  { v: "order", l: "Order help" },
  { v: "general", l: "Say hello" },
] as const;

export function ContactForm({ initialTopic = "general" }: { initialTopic?: ContactPayload["topic"] }) {
  const [topic, setTopic] = useState<ContactPayload["topic"]>(initialTopic);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const [ref, setRef] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = new FormData(e.currentTarget);
    const body = {
      topic,
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message") ?? "",
      address: fd.get("address") ?? "",
      consent: fd.get("consent") === "on",
      website: fd.get("website"),
    };
    const v = validateContact(body);
    if (!v.ok) {
      setErrors(v.errors);
      const first = Object.keys(v.errors)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setRef(json.ref);
        setStatus("done");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerError(json.error ?? "Something went wrong. Please check the form.");
    } catch {
      setServerError("Network problem. Please try again.");
    }
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div className="card success" role="status">
        <div className="tick" aria-hidden="true">✓</div>
        <h3>{topic === "sample" ? "Your complimentary sample is on its way." : "Message received. Thank you."}</h3>
        <p>We'll reply by email within one business day. Reference: <strong>{ref}</strong></p>
        <Link href="/shop" className="btn btn-ghost">Browse the shop</Link>
      </div>
    );
  }

  const fieldErr = (k: keyof ContactPayload) =>
    errors[k] ? (<span id={`${k}-err`} className="err">{errors[k]}</span>) : null;
  const aria = (k: keyof ContactPayload) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <form className="card form" onSubmit={onSubmit} noValidate id="form">
      <fieldset className="chips">
        <legend className="legend" style={{ marginBottom: 8 }}>What can we help with?</legend>
        {topics.map((t) => (
          <label className="chip" key={t.v}>
            <input type="radio" name="topic" value={t.v} checked={topic === t.v} onChange={() => setTopic(t.v)} />
            <span>{t.l}</span>
          </label>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" className="input" autoComplete="name" {...aria("name")} />
        {fieldErr("name")}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="input" autoComplete="email" inputMode="email" {...aria("email")} />
        {fieldErr("email")}
      </div>

      {topic === "sample" ? (
        <div className="field">
          <label htmlFor="address">Delivery address</label>
          <input id="address" name="address" className="input" autoComplete="street-address" {...aria("address")} />
          {fieldErr("address")}
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="message">
          Message {topic === "sample" ? <span className="opt">(optional)</span> : null}
        </label>
        <textarea id="message" name="message" className="input" {...aria("message")} />
        {fieldErr("message")}
      </div>

      <div className="hp" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field">
        <label className="check">
          <input type="checkbox" name="consent" {...aria("consent")} />
          <span>I agree to the <Link href="/privacy">privacy policy</Link>.</span>
        </label>
        {fieldErr("consent")}
      </div>

      {serverError ? <div className="alert" role="alert">{serverError}</div> : null}

      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : topic === "sample" ? "Claim my free sample" : "Send message"}
      </button>
    </form>
  );
}
