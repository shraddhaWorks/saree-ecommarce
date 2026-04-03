const MESSAGE = "FREE SHIPPING ACROSS INDIA";

function MarqueeTrack({ dupKey }: { dupKey: "a" | "b" }) {
  return (
    <div
      className="flex shrink-0 flex-nowrap items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14"
      aria-hidden={dupKey === "b" ? true : undefined}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={`${dupKey}-${i}`}
          className="whitespace-nowrap text-[9px] font-semibold uppercase leading-none tracking-[0.2em] text-[var(--announcement-sandal)] sm:text-[10px] sm:tracking-[0.24em]"
        >
          {MESSAGE}
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[45] h-8 w-full overflow-hidden border-b border-black/15 bg-[var(--announcement-maroon)]"
      role="region"
      aria-label="Promotions"
    >
      <div className="announcement-marquee-inner">
        <MarqueeTrack dupKey="a" />
        <MarqueeTrack dupKey="b" />
      </div>
    </div>
  );
}
