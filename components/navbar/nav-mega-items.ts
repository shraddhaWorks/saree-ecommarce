import { staticNavCategories, toStaticSlug } from "@/lib/static-nav-data";

import { primaryNavItems } from "./nav-items";

export type MegaPreview = {
  title: string;
  subtitle: string;
  imageUrl: string;
  /** When title slug does not match a mega child label, link here (same as Wedding Edit `/collections/...`). */
  href?: string;
};

const previewByLabel: Record<string, [MegaPreview, MegaPreview]> = {
  "Traditional Sarees": [
    {
      title: "Kanchi Pattu Sarees",
      subtitle: "Handpicked heritage weaves",
      imageUrl: "/navImg/saree.webp",
    },
    {
      title: "Banaras Silk Sarees",
      subtitle: "Timeless zari craftsmanship",
      imageUrl: "/navImg/saree3.webp",
      href: "/collections/banaras-sarees",
    },
  ],
  "Wedding Sarees": [
    {
      title: "Bridal Sarees",
      subtitle: "Grand silhouettes for the big day",
      imageUrl:
        "/navImg/kanchipattu.jpg",
    },
    {
      title: "Reception Sarees",
      subtitle: "Evening elegance in silk",
      imageUrl:
        "/navImg/kanchiaptt2.jpg",
    },
  ],
  "Designer & Party Wear Sarees": [
    {
      title: "Organza Sarees",
      subtitle: "Statement looks for celebrations",
      imageUrl:
        "/navImg/organzasaree.jpg",
    },
    {
      title: "Zari Kota & Semi Kota Sarees",
      subtitle: "Modern drapes with rich detailing",
      imageUrl:
        "/navImg/semikota.jpg",
    },
  ],
  "Festive Wear Sarees": [
    {
      title: "Ikkat Sarees",
      subtitle: "Bright tones and festive zari",
      imageUrl:
        "/navImg/ikkatsaree.jpg",
    },
    {
      title: "Bandini Sarees",
      subtitle: "Elegant silk for every function",
      imageUrl:
        "/navImg/ikkata2.jpg",
    },
  ],
  "Casual & Workwear Sarees": [
    {
      title: "Georgette, Crepe, Satin & Chiffon Silk Sarees",
      subtitle: "Lightweight everyday styles",
      imageUrl:
        "/navImg/work1.jpg",
    },
    {
      title: "Khadi, Jute, Bhagalpur & Printed Sarees",
      subtitle: "Minimal, graceful office picks",
      imageUrl:
        "/navImg/work2.jpg",
    },
  ],
  "Dhoti & Kanduva": [
    {
      title: "Silk Dhotis",
      subtitle: "Ceremonial classics in silk",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1212602367-JH_1.jpg?v=1775907521&width=360",
    },
    {
      title: "Dhoti & Kanduva Sets",
      subtitle: "Traditional sets for occasions",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1212474805-JH_1_1d0b3539-2e3a-4e49-b889-a127d6389436.jpg?v=1753330192&width=360",
    },
  ],
  "Our Stores": [
    {
      title: "Visit Our Stores",
      subtitle: "Experience collections in person",
      imageUrl:
        "https://imgs.search.brave.com/Za17Byl91gmmoLk-SOs9ixHC5bpfQB1QRHW221pftVM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODkz/MjM4MjcvcGhvdG8v/aW5kaWFuLXNhcmVl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9SVlDbEZua0tm/MFFpbk9EM0EweDdL/WFhNVFhJSTlWOUtC/QmV3TmpEcEZoTT0",
      href: "/stores",
    },
    {
      title: "Find Nearby Showrooms",
      subtitle: "Hyderabad, Vijayawada, Vizag",
      imageUrl:
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1200&q=80",
      href: "/stores",
    },
  ],
};

const defaultPreviews = (label: string): [MegaPreview, MegaPreview] => [
  {
    title: label,
    subtitle: "Curated collection",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469668-3c4f6a7d2b09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Shop now",
    subtitle: "Explore premium picks",
    imageUrl:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=80",
  },
];

export type NavMegaItem = {
  label: string;
  href: string;
  children: readonly { label: string; href: string }[];
  previews: [MegaPreview, MegaPreview];
};

/** Preview card → same collection URL as the matching mega-menu child (Wedding Edit flow). */
export function resolveMegaPreviewHref(
  item: NavMegaItem,
  preview: MegaPreview,
): string {
  if (preview.href) return preview.href;
  const key = toStaticSlug(preview.title);
  const child = item.children.find((c) => toStaticSlug(c.label) === key);
  return child?.href ?? item.href;
}

export function getNavMegaItems(): NavMegaItem[] {
  const categories = Object.values(staticNavCategories);
  return primaryNavItems.map((item) => {
    const match = categories.find((category) => category.title === item.label);
    return {
      label: item.label,
      href: item.href,
      children: match?.items ?? [],
      previews: previewByLabel[item.label] ?? defaultPreviews(item.label),
    };
  });
}
