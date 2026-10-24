import { Card } from "@/src/components/atoms/Card/Card";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { PickupTimeChip } from "@/src/components/atoms/PickupTimeChip/PickupTimeChip";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import type { ReferenceStore } from "@/src/domain/reference-store";
import { formatPickupWindow } from "@/src/lib/format";

export interface ReferenceStoreCardProps {
  store: ReferenceStore | null;
  now: Date;
  changeStoreHref: string;
}

/** N5 — "Aucune boutique référente" falls back to an `EmptyState` with a CTA into the same destination the "Changer" link would have used. */
export function ReferenceStoreCard({ store, now, changeStoreHref }: ReferenceStoreCardProps) {
  if (!store) {
    return (
      <Card variant="elevated">
        <EmptyState
          icon="store"
          title="Aucune épicerie référente"
          description="Choisissez votre épicerie de retrait habituelle pour un suivi plus rapide de vos commandes."
          action={
            <ButtonLink href={changeStoreHref} variant="soft">
              Choisir mon épicerie
            </ButtonLink>
          }
        />
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Mon épicerie référente</p>
        <PickupTimeChip label="Retrait en 2h" />
      </div>

      <div className="flex items-center gap-3">
        <IconTile icon="store" tone="cream" size={44} />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-foreground-strong">{store.name}</p>
          <p className="truncate text-xs text-muted-foreground">{store.address}</p>
        </div>
      </div>

      <div className="rounded-xl bg-catalog-chip p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <Icon name="clock" size={13} decorative />
          Créneaux Click &amp; Collect
        </p>
        <p className="mt-1 text-sm font-bold text-foreground-strong">{formatPickupWindow(now, store.pickupStartIso, store.pickupEndIso)}</p>
      </div>

      <TextLink href={changeStoreHref} variant="default" className="text-center">
        Changer d&apos;épicerie favorite →
      </TextLink>
    </Card>
  );
}
