import type { PageTemplate } from "@/types/storefront";

export const homepageAnalysis = {
  shell: [
    "The website uses a classic premium retail shell: utility bar, main navigation, search, account, wishlist/cart actions, and a dense footer.",
    "The visual rhythm alternates between product-led commerce blocks and large editorial banners, which makes the homepage feel like a fashion catalogue instead of a plain grid.",
    "The experience is image-heavy and mobile-first friendly, so the component system should separate layout wrappers from content cards and media blocks.",
  ],
  homepage: [
    "Hero carousel with campaign banners and direct category calls to action.",
    "Shop-by-category blocks for sarees, lehengas, gowns, kidswear, menswear, jewelry, and festive segments.",
    "Best sellers and new arrivals displayed as reusable product rails or card grids.",
    "Brand storytelling banners, store-discovery content, and trust-building informational strips.",
    "Footer area with newsletter capture, support links, store/contact details, and policy navigation.",
  ],
  commerce: [
    "Collection pages combine breadcrumbs, title, product count, toolbar, filters, product grid, pagination, long-form SEO content, and FAQ.",
    "Product pages combine media gallery, pricing, variant selectors, CTA area, delivery/support notes, full specifications, and related products.",
    "Static pages such as about, contact, and stores fit the same shell but use richer content modules like timelines, maps, store cards, and forms.",
  ],
};

export const projectStructure = [
  "app/",
  "  about/page.tsx",
  "  api/",
  "  collections/[handle]/page.tsx",
  "  contact/page.tsx",
  "  products/[handle]/page.tsx",
  "  stores/page.tsx",
  "  globals.css",
  "  layout.tsx",
  "  page.tsx",
  "components/",
  "  common/",
  "  home/",
  "  layout/",
  "  auth/",
  "  navbar/",
  "  sidebar/",
  "  planning/",
  "  collection/",
  "  product/",
  "  footer/",
  "features/",
  "  storefront/",
  "    blueprint-data.ts",
  "    frontend-blueprint-page.tsx",
  "types/",
  "  storefront.ts",
  "docs/",
  "  frontend-architecture.md",
];

export const componentStructure = [
  "components/layout/store-shell.tsx",
  "components/layout/announcement-bar.tsx",
  "components/layout/site-header.tsx",
  "components/navbar/main-navigation.tsx",
  "components/navbar/mobile-navigation.tsx",
  "components/navbar/nav-search.tsx",
  "components/home/home-hero.tsx",
  "components/home/category-spotlight.tsx",
  "components/home/campaign-banner.tsx",
  "components/home/product-rail.tsx",
  "components/home/editorial-story.tsx",
  "components/home/store-locator-strip.tsx",
  "components/collection/collection-header.tsx",
  "components/collection/filter-sidebar.tsx",
  "components/collection/sort-toolbar.tsx",
  "components/sidebar/filter-sidebar.tsx",
  "components/sidebar/account-sidebar.tsx",
  "components/sidebar/cart-sidebar.tsx",
  "components/collection/product-grid.tsx",
  "components/collection/seo-copy.tsx",
  "components/collection/faq-list.tsx",
  "components/auth/sign-in/sign-in-form.tsx",
  "components/auth/sign-up/sign-up-form.tsx",
  "components/auth/shared/auth-shell.tsx",
  "components/auth/shared/auth-field.tsx",
  "components/auth/shared/social-auth-buttons.tsx",
  "components/product/product-gallery.tsx",
  "components/product/purchase-panel.tsx",
  "components/product/specification-table.tsx",
  "components/product/related-products.tsx",
  "components/footer/site-footer.tsx",
  "components/footer/footer-newsletter.tsx",
];

export const pageTemplates: PageTemplate[] = [
  {
    href: "/collections/sample-sarees",
    label: "Template 01",
    title: "Collection Page",
    description:
      "Designed for saree, lehenga, or category listing pages with filters, sorting, product cards, SEO content, and FAQ.",
    sections: [
      "Breadcrumbs and collection identity",
      "Filter sidebar and mobile filter drawer",
      "Sort bar and product count",
      "Product grid with pagination or load more",
      "SEO description block",
      "FAQ accordion",
    ],
  },
  {
    href: "/products/sample-silk-saree",
    label: "Template 02",
    title: "Product Detail Page",
    description:
      "Designed for an image-first buying journey with gallery, pricing, variants, specifications, trust notes, and related products.",
    sections: [
      "Product media gallery",
      "Price, offer, and CTA block",
      "Variant, size, or color selectors",
      "Shipping and service highlights",
      "Product specification table",
      "Similar and recently viewed products",
    ],
  },
  {
    href: "/stores",
    label: "Template 03",
    title: "Store Locator Page",
    description:
      "Designed for physical store discovery with region filters, store cards, operating hours, map embeds, and contact actions.",
    sections: [
      "Intro hero",
      "City or region filter",
      "Store grid or list",
      "Store detail cards",
      "Map or directions",
      "Support CTA strip",
    ],
  },
];

export const aboutPageTemplate: PageTemplate = {
  href: "/about",
  label: "Static Page",
  title: "About Kalanjali-style Brand Story",
  description:
    "Use this page for brand history, craftsmanship, regional textile stories, and trust-building editorial content.",
  sections: [
    "Page hero",
    "Brand origin story",
    "Craft heritage timeline",
    "Values and quality promise",
    "Featured imagery",
    "CTA to collections or stores",
  ],
};

export const contactPageTemplate: PageTemplate = {
  href: "/contact",
  label: "Static Page",
  title: "Contact and Support",
  description:
    "Use this page for customer support contacts, enquiry forms, returns help, and service details.",
  sections: [
    "Intro hero",
    "Support contact cards",
    "Customer enquiry form",
    "Order help or FAQ links",
    "Store contact details",
    "Policy references",
  ],
};

export const storesPageTemplate: PageTemplate = {
  href: "/stores",
  label: "Static Page",
  title: "Store Locations",
  description:
    "Use this page for city-wise store discovery, address cards, timings, and store-specific highlights.",
  sections: [
    "Region filter",
    "Store cards",
    "Operating hours",
    "Map embed",
    "Phone and directions CTA",
    "Support strip",
  ],
};

export const collectionPageTemplate = pageTemplates[0];
export const productPageTemplate = pageTemplates[1];
