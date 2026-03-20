export function ShowcaseCard({
    title,
    subtitle,
    className,
}: {
    title: string;
    subtitle: string;
    className: string;
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-[26px] border border-[#d7c6b2] p-7 text-white shadow-[0_14px_40px_rgba(44,25,17,0.12)] ${className}`}
        >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.18))]" />
            <div className="relative flex h-full flex-col justify-end">
                <p className="font-[Georgia,'Times New Roman',serif] text-4xl uppercase tracking-[0.04em]">
                    {title}
                </p>
                <p className="mt-3 max-w-xs text-base text-white/90">{subtitle}</p>
            </div>
        </div>
    );
}
