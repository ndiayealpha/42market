import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface BannerCtaProps extends ComponentPropsWithoutRef<typeof Link> {
  icon?: ReactNode;
}

/** The white pill CTA inside a dark `BannerSurface`. */
export function BannerCta({ children, icon, className = "", ...props }: BannerCtaProps) {
  return (
    <Link
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-surface px-4 text-[13px] font-bold text-foreground-strong transition-colors duration-150 ease-out hover:bg-catalog-chip motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
      {...props}
    >
      {children}
      {icon}
    </Link>
  );
}
