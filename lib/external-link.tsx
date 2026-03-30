import type { ReactNode } from "react";
import Link from "next/link";

export function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

export function OutOrInLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
