import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Hot Arc." };

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const initial = topic === "sample" || topic === "order" ? topic : "general";
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let&apos;s <em>talk</em>.</h1>
          <p>Questions, orders or a free sample. We reply within one business day.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>Reach us directly</h2>
            <ul className="contact-list">
              <li><strong>Email</strong><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><strong>Phone</strong><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li><strong>Address</strong>{site.address}</li>
              <li><strong>Hours</strong>{site.hours}</li>
            </ul>
          </div>
          <ContactForm key={initial} initialTopic={initial} />
        </div>
      </section>
    </>
  );
}
