import type { ReactNode } from "react";
import Link from "next/link";

export function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

type OutOrInLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  /** Present on DOM for carousel tap-through (see `Carousel` `data-carousel-tap-through` handling). */
  "data-carousel-tap-through"?: boolean;
};

export function OutOrInLink({
  href,
  className,
  children,
  "data-carousel-tap-through": carouselTapThrough,
}: OutOrInLinkProps) {
  const tapAttrs =
    carouselTapThrough === true ? ({ "data-carousel-tap-through": true } as const) : {};
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...tapAttrs}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...tapAttrs}>
      {children}
    </Link>
  );
}
