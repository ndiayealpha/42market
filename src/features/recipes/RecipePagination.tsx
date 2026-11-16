import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface RecipePaginationProps {
  page: number;
  totalPages: number;
  totalCount: number;
  buildHref: (page: number) => string;
}

/** No generic pagination component exists in this codebase (Favoris/Recettes used "Charger plus" instead) — local to this listing, same "scope it locally" precedent as `HowItWorksSection`. */
export function RecipePagination({ page, totalPages, totalCount, buildHref }: RecipePaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-ink-muted">
        Page {page} sur {totalPages} ({totalCount} recettes artisanales)
      </p>
      <nav aria-label="Pagination des recettes" className="flex items-center gap-2">
        <Link
          href={buildHref(Math.max(1, page - 1))}
          aria-disabled={page === 1}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-border ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-catalog-chip"}`}
        >
          <Icon name="chevron-left" size={16} decorative />
        </Link>
        {pages.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={buildHref(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              pageNumber === page ? "bg-foreground-strong text-white" : "border border-border text-foreground-strong hover:bg-catalog-chip"
            }`}
          >
            {pageNumber}
          </Link>
        ))}
        <Link
          href={buildHref(Math.min(totalPages, page + 1))}
          aria-disabled={page === totalPages}
          className={`flex h-9 items-center gap-1 rounded-full border border-border px-3 text-sm font-bold ${
            page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-catalog-chip"
          }`}
        >
          Suivant
          <Icon name="chevron-right" size={16} decorative />
        </Link>
      </nav>
    </div>
  );
}
