import { Heart } from "lucide-react";

/** Non-interactive heart badge for promo / category tiles (clicks pass through to the parent link). */
export function DecorativeTileHeart({
  compact,
  className,
}: {
  compact?: boolean;
  /** Full placement + box size, e.g. `bottom-5 right-5 h-10 w-10` (defaults to top-right). */
  className?: string;
}) {
  const icon = compact ? 12 : 16;
  const box = compact ? "right-2 top-2 h-8 w-8" : "right-3 top-3 h-9 w-9";

  return (
    <span
      className={`pointer-events-none absolute z-[1] flex items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10 ${className ?? box}`}
      aria-hidden
    >
      <Heart size={icon} className="text-black" strokeWidth={2.25} />
    </span>
  );
}
