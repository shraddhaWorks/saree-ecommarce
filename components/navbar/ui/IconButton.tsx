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
            className={`flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-black/5 hover:text-[#9d2936] sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-black ${className}`}
        >
            {children}
        </button>
    );
}
