const accountLinks = [
  "Profile",
  "Orders",
  "Wishlist",
  "Saved Addresses",
  "Support",
];

interface AccountSidebarProps {
  activeTab: string;
  onSelect: (tab: string) => void;
}

export function AccountSidebar({ activeTab, onSelect }: AccountSidebarProps) {
  return (
    <aside className="rounded-3xl border border-border-soft bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
        My Account
      </p>
      <ul className="mt-4 space-y-3">
        {accountLinks.map((item) => (
          <li key={item}>
            <button
              onClick={() => onSelect(item)}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                activeTab === item
                  ? "border-[#9d2936] bg-[#9d2936] text-white"
                  : "border-border-soft bg-white text-black/75 hover:border-[#9d2936] hover:text-[#9d2936]"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
