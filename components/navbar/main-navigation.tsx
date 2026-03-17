import Link from "next/link";

const navItems = [
  { label: "Sarees", href: "/collections/sarees" },
  { label: "Lehengas", href: "/collections/lehengas" },
  { label: "Kids", href: "/collections/kids" },
  { label: "Jewelry", href: "/collections/jewelry" },
  { label: "Stores", href: "/stores" },
];

export function MainNavigation() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium tracking-[0.18em] uppercase text-black/70 transition hover:text-accent"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
