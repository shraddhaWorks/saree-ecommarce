/**
 * Home “Best of Sale” only — max in-stock catalog products shown there.
 * Use `<ProductList maxProducts={HOME_BEST_OF_SALE_LIMIT} />` on the home page;
 * use `<ProductList />` elsewhere to show the full list (capped at {@link PRODUCT_LIST_FULL_PAGE_TAKE} per request).
 */
export const HOME_BEST_OF_SALE_LIMIT = 6;

/** DB fetch size when ProductList has no home cap (other pages). */
export const PRODUCT_LIST_FULL_PAGE_TAKE = 400;
