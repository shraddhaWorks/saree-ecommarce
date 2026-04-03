import type { Category, Product, ProductImage } from "@/lib/generated/prisma/client";
import { FALLBACK_SAREE_IMAGE } from "@/lib/storefront-images";
import type { StorefrontProduct } from "@/types/storefront";

export type ProductWithRelations = Product & {
  category: Category;
  images: ProductImage[];
};

export function toStorefrontProduct(p: ProductWithRelations): StorefrontProduct {
  const ordered = [...p.images].sort((a, b) => a.position - b.position);
  const urls = ordered.map((i) => i.url).filter(Boolean);
  if (urls.length === 0 && p.mainImageUrl) urls.push(p.mainImageUrl);
  if (urls.length === 0 && p.thumbnailUrl) urls.push(p.thumbnailUrl);
  if (urls.length === 0) urls.push(FALLBACK_SAREE_IMAGE);

  const available = p.inStock && p.stockQuantity > 0;
  const discountPct = p.isSpecial ? 10 : undefined;
  const priceRs = Math.round(p.priceInPaise / 100);
  const compareAtPrice =
    discountPct != null ? Math.round(priceRs / (1 - discountPct / 100)) : undefined;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: priceRs,
    compareAtPrice,
    description: p.description ?? "",
    stock: p.stockQuantity,
    inStock: available,
    images: urls,
    discount: discountPct,
    clothType: String(p.clothType),
    occasion: p.occasion ? String(p.occasion) : null,
    color: p.color?.trim() || null,
    pattern: p.pattern?.trim() || null,
  };
}
