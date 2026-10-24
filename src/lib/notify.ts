import type { ContactPayload } from "./validation";

// Notification adapter (see "Design a Notification System").
// The API route only depends on this interface, so delivery can move to a
// queue + email provider (Resend, SES, SendGrid...) without changing callers.
export interface Notifier {
  send(payload: ContactPayload, ref: string): Promise<void>;
}

class ConsoleNotifier implements Notifier {
  async send(payload: ContactPayload, ref: string) {
    console.log(`[contact:${ref}]`, { ...payload, consent: undefined });
  }
}

export const notifier: Notifier = new ConsoleNotifier();
