import Link from "next/link";
import { Can } from "./Can";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card product">
      <div className="product-art">
        {p.badge ? <span className="badge">{p.badge}</span> : null}
        <Can color={p.color} />
      </div>
      <div className="product-body">
        <h3>{p.name}</h3>
        <p>{p.tagline} {p.description}</p>
        <div className="price-row">
          <span className="price">€{p.priceEur}</span>
          <span className="size">{p.size}</span>
        </div>
        <Link href={`/contact?topic=order&product=${p.id}#form`} className="btn btn-primary">
          Order {p.name}
        </Link>
      </div>
    </article>
  );
}
