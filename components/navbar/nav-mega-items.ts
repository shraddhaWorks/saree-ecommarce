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
      imageUrl: "/mega-menu/kanchi-pattu.svg",
    },
    {
      title: "Banaras Silk Sarees",
      subtitle: "Timeless zari craftsmanship",
      imageUrl: "/mega-menu/banaras-silk.svg",
      href: "/collections/banaras-sarees",
    },
  ],
  "Wedding Sarees": [
    {
      title: "Bridal Sarees",
      subtitle: "Grand silhouettes for the big day",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/11141457-04006-001_1_389badac-37f1-40f6-9db5-b1847ed618a5.jpg?v=1754119962&width=360",
    },
    {
      title: "Reception Sarees",
      subtitle: "Evening elegance in silk",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1412408754-VJ_1.jpg?v=1773820969&width=360",
    },
  ],
  "Designer & Party Wear Sarees": [
    {
      title: "Organza Sarees",
      subtitle: "Statement looks for celebrations",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/11157776-02002-001_1_5c9a943b-3d86-45bb-99f5-0f69a3f8fbb5.jpg?v=1766498343&width=360",
    },
    {
      title: "Zari Kota & Semi Kota Sarees",
      subtitle: "Modern drapes with rich detailing",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1212566545-HH_1_e488734b-c769-4589-b9b6-fb8c5af7398e.jpg?v=1771828431&width=360",
    },
  ],
  "Festive Wear Sarees": [
    {
      title: "Ikkat Sarees",
      subtitle: "Bright tones and festive zari",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1412380055-VJ_1_92c3e3eb-d58a-4cc8-8837-d47d38c6db6b.jpg?v=1756894920&width=360",
    },
    {
      title: "Bandini Sarees",
      subtitle: "Elegant silk for every function",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1412394001-VJ_1_c0d8536b-2ffb-4db2-8c1c-8ca81b059f62.jpg?v=1766378075&width=1512",
    },
  ],
  "Casual & Workwear Sarees": [
    {
      title: "Georgette, Crepe, Satin & Chiffon Silk Sarees",
      subtitle: "Lightweight everyday styles",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1412391973-VJ_1_9c21dfa0-ae9c-489f-9a2c-c27447b442ee.jpg?v=1764310117&width=360",
    },
    {
      title: "Khadi, Jute, Bhagalpur & Printed Sarees",
      subtitle: "Minimal, graceful office picks",
      imageUrl:
        "https://kalanjali.com/cdn/shop/files/1212510044-JH_1_54c01311-9ffc-4b70-a8d8-39459477aa0d.jpg?v=1763266754&width=360",
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
