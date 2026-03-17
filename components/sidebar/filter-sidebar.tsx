const filters = {
  Fabric: ["Silk", "Cotton", "Organza", "Banarasi"],
  Occasion: ["Wedding", "Festive", "Party", "Casual"],
  Color: ["Red", "Pink", "Green", "Gold"],
};

export function FilterSidebar() {
  return (
    <aside className="rounded-3xl border border-border-soft bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
        Filters
      </p>
      <div className="mt-5 space-y-5">
        {Object.entries(filters).map(([group, items]) => (
          <section key={group}>
            <h3 className="text-sm font-semibold text-black/80">{group}</h3>
            <ul className="mt-3 space-y-2 text-sm text-black/65">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
