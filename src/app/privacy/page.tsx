import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Hot Arc handles your data." };

export default function Privacy() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Privacy <em>policy</em>.</h1>
          <p>Plain language, no surprises. Last updated October 2026.</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p><em>Template text: have your legal counsel review it before launch (GDPR applies to German operations).</em></p>
          <h2>Who we are</h2>
          <p>{site.name}, {site.address}, is the controller of your personal data. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>What we collect</h2>
          <ul>
            <li>Name and email, so we can reply to you.</li>
            <li>Delivery address, only if you request a sample or place an order.</li>
            <li>Your message and the topic you choose.</li>
          </ul>
          <h2>Why we use it</h2>
          <ul>
            <li>To answer your enquiry and fulfil samples and orders (contract / legitimate interest).</li>
            <li>To prevent abuse of our forms (legitimate interest).</li>
          </ul>
          <p>We do not sell your data and do not send marketing without separate consent.</p>
          <h2>Sharing and retention</h2>
          <p>We share data only with providers needed to deliver your order or email (shipping, email). We keep enquiries for up to 12 months, and order records as long as the law requires.</p>
          <h2>Your rights</h2>
          <p>You may request access, correction, deletion, restriction, portability, or object to processing, and complain to your data protection authority. Email us to exercise these rights.</p>
          <h2>Cookies</h2>
          <p>This site does not use advertising or tracking cookies.</p>
        </div>
      </section>
    </>
  );
}
