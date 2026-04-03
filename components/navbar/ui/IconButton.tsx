import type { ReactNode } from "react";

type IconButtonProps = {
  label: string;
  children: ReactNode;
  onClick: () => void;
  className?: string;
  /** Gold on emerald (storefront royal header). */
  variant?: "default" | "royal";
};

export function IconButton({
  label,
  children,
  onClick,
  className = "",
  variant = "default",
}: IconButtonProps) {
  const base =
    variant === "royal"
      ? "text-[var(--nav-royal-gold-bright)] hover:bg-white/10 hover:text-[#fff3c4] active:bg-white/15"
      : "text-black hover:bg-black/5 hover:text-[#9d2936]";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition sm:h-9 sm:w-9 lg:h-10 lg:w-10 ${base} ${className}`}
    >
      {children}
    </button>
  );
}
