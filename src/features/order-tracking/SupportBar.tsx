import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

export interface SupportBarProps {
  orderReference: string;
}

/**
 * S7's support bar. `routes.main.support` has no page built under it yet
 * in this repo (pre-existing gap, not introduced here), so the
 * `?commande=` param is appended defensively for whenever that page can
 * read it.
 */
export function SupportBar({ orderReference }: SupportBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-catalog-chip px-4 py-3">
      <p className="flex items-center gap-2 text-sm text-foreground-strong">
        <Icon name="help-circle" size={18} decorative />
        Besoin d&apos;aide sur cette commande ?
      </p>
      <Link
        href={`${routes.main.support}?commande=${encodeURIComponent(orderReference)}`}
        className="text-sm font-semibold text-foreground-strong underline underline-offset-2 hover:no-underline"
      >
        Contacter le support
      </Link>
    </div>
  );
}
