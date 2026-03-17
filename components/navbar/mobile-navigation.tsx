type MobileNavigationProps = {
  isOpen?: boolean;
};

const mobileItems = [
  "New Arrivals",
  "Best Sellers",
  "Silk Sarees",
  "Bridal Wear",
  "Store Locator",
];

export function MobileNavigation({
  isOpen = true,
}: MobileNavigationProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-border-soft bg-surface p-5 lg:hidden">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
        Mobile Menu
      </p>
      <ul className="mt-4 space-y-3">
        {mobileItems.map((item) => (
          <li
            key={item}
            className="border-b border-border-soft pb-3 text-sm font-medium text-black/75 last:border-b-0 last:pb-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
