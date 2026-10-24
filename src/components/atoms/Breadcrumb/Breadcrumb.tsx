import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the last item — it's the current page, rendered as text with `aria-current="page"`. */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground-strong hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-medium text-foreground-strong" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <Icon name="chevron-right" size={12} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
