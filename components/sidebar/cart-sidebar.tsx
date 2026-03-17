const cartItems = [
  { name: "Banarasi Silk Saree", details: "Ruby red / 1 item", price: "Rs. 12,499" },
  { name: "Temple Jewelry Set", details: "Gold tone / 1 item", price: "Rs. 4,999" },
];

export function CartSidebar() {
  return (
    <aside className="rounded-3xl border border-border-soft bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
          Cart Summary
        </p>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          2 items
        </span>
      </div>
      <ul className="mt-5 space-y-3">
        {cartItems.map((item) => (
          <li
            key={item.name}
            className="rounded-2xl border border-border-soft bg-white p-4"
          >
            <p className="text-sm font-semibold text-black/80">{item.name}</p>
            <p className="mt-1 text-sm text-black/55">{item.details}</p>
            <p className="mt-3 text-sm font-medium text-accent">{item.price}</p>
          </li>
        ))}
      </ul>
      <button className="mt-5 w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
        Checkout
      </button>
    </aside>
  );
}
