import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { sampleHref } from "@/lib/site";

export const metadata: Metadata = { title: "Shop", description: "Browse Hot Arc's German drinks." };

export default function Shop() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">The collection</span>
          <h1>Four ways to <em>win</em> your evening.</h1>
          <p>Not sure where to begin? Start with a free sample.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {products.map((p) => (<ProductCard key={p.id} p={p} />))}
          </div>
          <div className="card shop-cta">
            <div>
              <h3>Not ready to commit?</h3>
              <p>Try before you buy. A complimentary sample, delivered.</p>
            </div>
            <Link href={sampleHref} className="btn btn-primary">Get a free sample</Link>
          </div>
        </div>
      </section>
    </>
  );
}
