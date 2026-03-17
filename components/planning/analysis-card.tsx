type AnalysisCardProps = {
  title: string;
  items: string[];
};

export function AnalysisCard({ title, items }: AnalysisCardProps) {
  return (
    <section className="rounded-3xl border border-border-soft bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-black/70">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-accent/30 pl-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
