import type { Category, Product, ProductImage } from "@/lib/generated/prisma/client";
import type { StorefrontProduct } from "@/types/storefront";

export type ProductWithRelations = Product & {
  category: Category;
  images: ProductImage[];
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80";

export function toStorefrontProduct(p: ProductWithRelations): StorefrontProduct {
  const ordered = [...p.images].sort((a, b) => a.position - b.position);
  const urls = ordered.map((i) => i.url).filter(Boolean);
  if (urls.length === 0 && p.mainImageUrl) urls.push(p.mainImageUrl);
  if (urls.length === 0 && p.thumbnailUrl) urls.push(p.thumbnailUrl);
  if (urls.length === 0) urls.push(PLACEHOLDER);

  const available = p.inStock && p.stockQuantity > 0;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Math.round(p.priceInPaise / 100),
    description: p.description ?? "",
    stock: p.stockQuantity,
    inStock: available,
    images: urls,
    discount: p.isSpecial ? 10 : undefined,
    clothType: String(p.clothType),
    occasion: p.occasion ? String(p.occasion) : null,
  };
}
