import Link from "next/link";

import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { buildTelUrl } from "@/src/domain/store-detail";
import { routes } from "@/src/lib/routing/routes";

export interface HelpCardProps {
  /** No app-wide "support" phone constant exists (checked `src/domain`) — checkout is scoped to one store, so this is `STORE_DETAIL.phone`, the same number already shown in K3, not an invented new one. */
  supportPhone: string;
}

/** K9 — beige card, reuses `IconTile`/`buildTelUrl`. */
export function HelpCard({ supportPhone }: HelpCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-catalog-chip p-4">
      <IconTile icon="headset" tone="cream" size={40} />
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground-strong">Une question sur votre panier ?</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Équipe 42 Markets joignable au{" "}
          <a href={buildTelUrl(supportPhone)} className="font-semibold text-foreground-strong underline underline-offset-2">
            {supportPhone}
          </a>
        </p>
        <Link href={routes.main.support} className="mt-1 inline-block text-xs font-semibold text-foreground-strong underline underline-offset-2">
          Aide
        </Link>
      </div>
    </div>
  );
}
