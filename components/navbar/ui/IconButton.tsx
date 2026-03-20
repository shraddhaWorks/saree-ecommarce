import type { ReactNode } from "react";

export function IconButton({
    label,
    children,
    onClick,
}: {
    label: string;
    children: ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-black/5 hover:text-[#9d2936]"
        >
            {children}
        </button>
    );
}
