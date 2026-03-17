type FolderTreeProps = {
  title: string;
  lines: string[];
};

export function FolderTree({ title, lines }: FolderTreeProps) {
  return (
    <section className="rounded-3xl border border-border-soft bg-[#1b1412] p-6 text-stone-100 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-stone-300">
          frontend-only
        </span>
      </div>
      <pre className="mt-4 overflow-x-auto text-sm leading-6 text-stone-300">
        <code>{lines.join("\n")}</code>
      </pre>
    </section>
  );
}
