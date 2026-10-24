import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface PickupQrPanelProps {
  orderReference: string;
  pin: string;
  className?: string;
}

/**
 * Extracted from the Profile's `QrCodeDialog` (Phase 0 audit) and shared by
 * it and S2's `PickupPassCard` — one QR+PIN panel instead of two. No
 * QR-generation library is installed (none found, and rule 11 forbids a new
 * dependency without proposing it first): this renders a labelled
 * placeholder, flagged in the compte-rendu as needing a real QR lib (e.g.
 * `qrcode`) before ship. PIN digits are duplicated as screen-reader text
 * (rule: "PIN lisible en texte").
 */
export function PickupQrPanel({ orderReference, pin, className = "" }: PickupQrPanelProps) {
  const pinDigits = pin.split("");
  return (
    <div className={`flex flex-col items-center gap-4 rounded-xl bg-catalog-chip p-5 ${className}`}>
      <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Scan comptoir express</p>
      <div
        role="img"
        aria-label={`QR code de retrait de la commande ${orderReference} (aperçu, génération réelle à intégrer)`}
        className="flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface"
      >
        <Icon name="qr-code" size={64} className="text-muted-foreground" decorative />
      </div>
      <div>
        <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">Code PIN de secours</p>
        <div aria-hidden className="mt-1.5 flex items-center gap-1.5">
          {pinDigits.map((digit, index) => (
            <span key={index} className="flex h-9 w-8 items-center justify-center rounded-lg bg-surface text-lg font-bold text-foreground-strong shadow-card">
              {digit}
            </span>
          ))}
        </div>
        <p className="sr-only">Code PIN : {pinDigits.join(" ")}</p>
      </div>
    </div>
  );
}
