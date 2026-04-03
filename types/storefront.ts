export type PageTemplate = {
  href: string;
  label: string;
  title: string;
  description: string;
  sections: string[];
};

/** Client-safe product shape for the storefront (mirrors Prisma enums as strings). */
export type StorefrontProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  /** Original list price when discounted (rupees, for strikethrough). */
  compareAtPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  stock: number;
  inStock: boolean;
  clothType: string;
  occasion: string | null;
  color: string | null;
  pattern: string | null;
};
