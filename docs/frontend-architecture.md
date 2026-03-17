# Kalanjali Frontend Architecture

## Live site analysis

The public `kalanjali.com` storefront currently follows a premium fashion-commerce pattern:

- Utility-led header with search and account/cart actions.
- Homepage built from campaign banners, category showcases, product rails, brand storytelling, and store-focused content.
- Collection pages built from grid commerce plus long-form SEO blocks and FAQ content.
- Product pages built from image gallery, buy box, specifications, and related product discovery.
- Dense footer with newsletter, support links, policies, and location/contact information.

## Recommended frontend-first structure

```text
app/
  about/page.tsx
  api/
  collections/[handle]/page.tsx
  contact/page.tsx
  products/[handle]/page.tsx
  stores/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  common/
  home/
  layout/
  auth/
  navbar/
  sidebar/
  planning/
  collection/
  product/
  footer/
features/
  storefront/
    blueprint-data.ts
    frontend-blueprint-page.tsx
types/
  storefront.ts
docs/
  frontend-architecture.md
```

## Main component groups

```text
components/layout/store-shell.tsx
components/layout/announcement-bar.tsx
components/layout/site-header.tsx
components/navbar/main-navigation.tsx
components/navbar/mobile-navigation.tsx
components/navbar/nav-search.tsx
components/home/home-hero.tsx
components/home/category-spotlight.tsx
components/home/campaign-banner.tsx
components/home/product-rail.tsx
components/home/editorial-story.tsx
components/home/store-locator-strip.tsx
components/auth/sign-in/sign-in-form.tsx
components/auth/sign-up/sign-up-form.tsx
components/auth/shared/auth-shell.tsx
components/auth/shared/auth-field.tsx
components/auth/shared/social-auth-buttons.tsx
components/collection/collection-header.tsx
components/collection/filter-sidebar.tsx
components/collection/sort-toolbar.tsx
components/sidebar/filter-sidebar.tsx
components/sidebar/account-sidebar.tsx
components/sidebar/cart-sidebar.tsx
components/collection/product-grid.tsx
components/collection/seo-copy.tsx
components/collection/faq-list.tsx
components/product/product-gallery.tsx
components/product/purchase-panel.tsx
components/product/specification-table.tsx
components/product/related-products.tsx
components/footer/site-footer.tsx
components/footer/footer-newsletter.tsx
```

## Build order

1. Create the global shell: announcement bar, header, nav, footer.
2. Build homepage sections as independent components.
3. Build collection page layout with grid, filters, sort, and SEO modules.
4. Build product page layout with gallery, buy box, and spec modules.
5. Add static pages like stores, about, and contact.

## Starter components added

- `components/navbar/main-navigation.tsx`
- `components/navbar/mobile-navigation.tsx`
- `components/navbar/nav-search.tsx`
- `components/sidebar/filter-sidebar.tsx`
- `components/sidebar/account-sidebar.tsx`
- `components/sidebar/cart-sidebar.tsx`

## Auth routes added

- `app/(auth)/sign-in/page.tsx`
- `app/(auth)/sign-up/page.tsx`
- `components/auth/sign-in/sign-in-form.tsx`
- `components/auth/sign-up/sign-up-form.tsx`
- `components/auth/shared/auth-shell.tsx`
- `components/auth/shared/auth-field.tsx`
- `components/auth/shared/social-auth-buttons.tsx`
