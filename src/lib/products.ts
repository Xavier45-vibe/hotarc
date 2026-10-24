// Catalog is a static data module: pages are statically generated and CDN-cacheable.
// Swap for a CMS / DB call later without touching UI components.
export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceEur: number;
  size: string;
  badge?: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "arc-original",
    name: "Arc Original",
    tagline: "Our signature. Bright, bold, balanced.",
    description:
      "Alpine herbs and citrus, developed with Michelin-starred chefs. The one that started it all.",
    priceEur: 24,
    size: "6 × 330 ml",
    badge: "Bestseller",
    color: "#C9A24B",
  },
  {
    id: "apfel-gold",
    name: "Apfel Gold",
    tagline: "Orchard-pressed sparkle.",
    description:
      "A crisp German apple sparkler with a clean, dry finish. Easy to love, easy to finish.",
    priceEur: 21,
    size: "6 × 330 ml",
    color: "#B88A3A",
  },
  {
    id: "kraeuter-zero",
    name: "Kräuter Zero",
    tagline: "Herbal depth, zero alcohol.",
    description:
      "A bittersweet herbal tonic for evenings when you want flavour without the fuss.",
    priceEur: 22,
    size: "6 × 330 ml",
    badge: "New",
    color: "#D8B96A",
  },
  {
    id: "victory-mix",
    name: "Victory Mix Box",
    tagline: "Every flavour, one box.",
    description:
      "Two of each signature drink. The perfect way to find your favourite, delivered home.",
    priceEur: 29,
    size: "6 × 330 ml",
    color: "#E8CF8F",
  },
];
