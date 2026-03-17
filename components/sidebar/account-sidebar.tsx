const accountLinks = [
  "Profile",
  "Orders",
  "Wishlist",
  "Saved Addresses",
  "Support",
];

export function AccountSidebar() {
  return (
    <aside className="rounded-3xl border border-border-soft bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
        My Account
      </p>
      <ul className="mt-4 space-y-3">
        {accountLinks.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-border-soft bg-white px-4 py-3 text-sm text-black/75"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
