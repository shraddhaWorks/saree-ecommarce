import type { ReactNode } from "react";
import { CloseIcon } from "../icons";

export function Drawer({
    isOpen,
    title,
    count,
    onClose,
    children,
}: {
    isOpen: boolean;
    title: string;
    count?: string;
    onClose: () => void;
    children: ReactNode;
}) {
    return (
        <aside
            className={`fixed right-0 top-8 z-[55] flex h-[calc(100dvh-2rem)] w-full max-w-[780px] flex-col rounded-l-[18px] bg-[#fdfbf7] shadow-[-16px_0_48px_rgba(44,25,17,0.18)] transition-transform duration-300 ${isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
                }`}
            aria-hidden={!isOpen}
        >
            <div className="flex items-start justify-between gap-4 px-8 pb-6 pt-10">
                <h2 className="font-[Georgia,'Times New Roman',serif] text-[40px] leading-none text-black sm:text-[54px]">
                    {title} {count ? <span className="text-[28px]">{count}</span> : null}
                </h2>
                <button
                    type="button"
                    aria-label={`Close ${title}`}
                    onClick={onClose}
                    className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-black/45 text-black transition hover:border-[#9d2936] hover:text-[#9d2936]"
                >
                    <CloseIcon />
                </button>
            </div>
            {children}
        </aside>
    );
}
