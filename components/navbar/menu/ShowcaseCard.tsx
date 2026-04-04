import Link from "next/link";

export function ShowcaseCard({
    title,
    subtitle,
    className,
    imageSrc,
    href,
    ctaLabel,
    onNavigate,
}: {
    title: string;
    subtitle: string;
    className: string;
    imageSrc?: string;
    href?: string;
    ctaLabel?: string;
    onNavigate?: () => void;
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-[26px] border border-[#d7c6b2] p-7 text-white shadow-[0_14px_40px_rgba(44,25,17,0.12)] lg:p-10 ${className}`}
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,7,4,0.08),rgba(18,7,4,0.58))]" />
            <div className="relative flex h-full flex-col justify-end">
                <p className="font-[Georgia,'Times New Roman',serif] text-4xl tracking-[0.03em] sm:text-5xl">
                    {title}
                </p>
                <p className="mt-4 max-w-sm text-lg leading-9 text-white/90">{subtitle}</p>
                {ctaLabel ? (
                    href ? (
                        <Link
                            href={href}
                            onClick={onNavigate}
                            className="mt-8 inline-flex w-fit items-center justify-center rounded-[18px] bg-[#d4a63f] px-10 py-4 text-xl font-semibold text-white transition hover:bg-[#bf9333]"
                        >
                            {ctaLabel}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="mt-8 inline-flex w-fit items-center justify-center rounded-[18px] bg-[#d4a63f] px-10 py-4 text-xl font-semibold text-white transition hover:bg-[#bf9333]"
                        >
                            {ctaLabel}
                        </button>
                    )
                ) : null}
            </div>
        </div>
    );
}
