import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { InfoTile } from "@/src/components/molecules/InfoTile/InfoTile";
import { PickupQrPanel } from "@/src/components/molecules/PickupQrPanel/PickupQrPanel";
import type { FullOrder } from "@/src/domain/orders";
import { formatPickupWindow } from "@/src/lib/format";

export interface PickupPassCardProps {
  order: FullOrder;
  now: Date;
}

const STATUS_MESSAGE: Partial<Record<FullOrder["status"], string>> = {
  completed: "Cette commande a déjà été retirée — le QR code et le PIN ne sont plus valables.",
  cancelled: "Cette commande a été annulée — aucun retrait n'est possible.",
};

/** S2 — the Click & Collect pass: reassurance tiles on the left, the live QR/PIN (or a status message once terminal) on the right. QR/PIN only shown while "preparing"/"ready" (rule: jamais un QR obsolète). */
export function PickupPassCard({ order, now }: PickupPassCardProps) {
  const showPass = order.status === "preparing" || order.status === "ready";

  return (
    <Card variant="elevated">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-catalog-chip px-3 py-1 text-xs font-bold text-foreground-strong">
              <Icon name="qr-code" size={14} decorative />
              Pass Click &amp; Collect
            </span>
            <Badge color="success">✓ Créneau réservé</Badge>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Créneau de mise à disposition</p>
            <h2 className="text-lg font-extrabold text-foreground-strong">
              {formatPickupWindow(now, order.pickupWindow.startIso, order.pickupWindow.endIso)}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Présentez votre QR code ou votre PIN en caisse pour récupérer votre commande.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoTile icon="shield" title="Chaîne du froid 100% préservée" subtitle="Casier réfrigéré 3°C" layout="tile" />
            <InfoTile icon="zap" title="Retrait sans file d'attente" subtitle="File coupe-file Click & Collect" layout="tile" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          {showPass ? (
            <PickupQrPanel orderReference={order.reference} pin={order.pin} />
          ) : (
            <p className="rounded-xl bg-catalog-chip p-5 text-center text-sm text-muted-foreground">{STATUS_MESSAGE[order.status]}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
