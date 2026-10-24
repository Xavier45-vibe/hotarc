import Link from "next/link";
import { Can } from "@/components/Can";
import { ContactForm } from "@/components/ContactForm";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { site, sampleHref } from "@/lib/site";

const steps = [
  { t: "Tell us where", d: "Share your name and address. It takes under a minute." },
  { t: "We ship it free", d: "Your sample is carefully packed and sent to your door." },
  { t: "Savour the win", d: "Sip, enjoy, and reorder only if you love it." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container section hero-grid">
          <div>
            <span className="eyebrow">German craft drinks</span>
            <h1>Raise a glass to your <em>win</em>.</h1>
            <p className="lead">
              Crafted with the world&apos;s finest chefs and delivered to your door. A quiet,
              well-earned victory, poured for one.
            </p>
            <div className="hero-cta">
              <Link href={sampleHref} className="btn btn-primary">Order your free sample</Link>
              <Link href="/shop" className="btn">Explore the collection</Link>
            </div>
            <p className="hero-note">Complimentary delivery · No subscription · No pressure</p>
          </div>
          <div className="can-wrap" aria-hidden="true">
            <Can className="can" />
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="container">
          <ul>
            <li>Chef-crafted</li>
            <li>Made in Germany</li>
            <li>Portioned for one</li>
          </ul>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to your first sip.</h2>
          </div>
          <div className="grid grid-3">
            {steps.map((s, i) => (
              <div className="card" key={s.t}>
                <div className="num">0{i + 1}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The collection</span>
            <h2>Find the one that feels like <em>you</em>.</h2>
            <p className="lead">Every drink is made for one: no waste, no compromise.</p>
          </div>
          <div className="grid grid-4">
            {products.slice(0, 3).map((p) => (<ProductCard key={p.id} p={p} />))}
          </div>
          <p style={{ marginTop: 40 }}>
            <Link href="/shop" className="btn">View all</Link>
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container section cta-in">
          <span className="eyebrow" style={{ margin: 0 }}>Complimentary</span>
          <h2>Your first one&apos;s <em>on us</em>.</h2>
          <Link href={sampleHref} className="btn btn-primary">Claim your free sample</Link>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Contact us</span>
            <h2>Say hello. We answer <em>fast</em>.</h2>
            <p className="lead">Questions about a drink, an order, or a sample? Reach us your way.</p>
            <ul className="contact-list">
              <li><strong>Email</strong><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><strong>Phone</strong><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li><strong>Hours</strong>{site.hours}</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
