import type { ReactNode } from "react";

export function IconButton({
    label,
    children,
    onClick,
    className = "",
}: {
    label: string;
    children: ReactNode;
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5 hover:text-[#9d2936] sm:h-9 sm:w-9 lg:h-11 lg:w-11 text-black ${className}`}
        >
            {children}
        </button>
    );
}
