import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo"><LogoMark />{site.name}</Link>
            <p style={{ marginTop: 12, maxWidth: "36ch" }}>{site.description}</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {nav.map((n) => (<li key={n.href}><Link href={n.href}>{n.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3>Get in touch</h3>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>
        <small>© {new Date().getFullYear()} {site.name}. Please enjoy responsibly.</small>
      </div>
    </footer>
  );
}
