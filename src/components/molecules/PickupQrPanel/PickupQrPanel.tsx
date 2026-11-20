import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface PickupQrPanelProps {
  orderReference: string;
  /**
   * Encodes this, not `orderReference` — an opaque per-order token, never
   * the human-readable reference (N3, 2026-11-17 UAT). Optional: Profile's
   * `QrCodeDialog` (`ActiveOrder`, out of this UAT's scope) has no such
   * token yet, and keeps the old placeholder rather than fabricating one.
   */
  qrToken?: string;
  pin: string;
  className?: string;
}

/**
 * Extracted from the Profile's `QrCodeDialog` (Phase 0 audit) and shared by
 * it and S2's `PickupPassCard` — one QR+PIN panel instead of two.
 *
 * N3 (2026-11-17 UAT): a real, scannable QR code for Page S — no new npm
 * dependency (rule 11), same move as `StoreMap`'s embed: an external
 * QR-image endpoint renders the PNG from `qrToken`. What's still missing
 * (flagged in the compte-rendu, same gap as N1/N5): a real counter-side
 * endpoint that can actually verify/redeem a scanned `qrToken` — nothing
 * reads this token anywhere yet, there's no backend to build it against in
 * this mock. PIN digits are duplicated as screen-reader text (rule: "PIN
 * lisible en texte").
 */
export function PickupQrPanel({ orderReference, qrToken, pin, className = "" }: PickupQrPanelProps) {
  const pinDigits = pin.split("");
  const qrImageUrl = qrToken ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=0&data=${encodeURIComponent(qrToken)}` : null;
  return (
    <div className={`flex flex-col items-center gap-4 rounded-xl bg-catalog-chip p-5 ${className}`}>
      <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Scan comptoir express</p>
      {qrImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- external, opaque-per-order URL: not an optimizable local/static asset
        <img
          src={qrImageUrl}
          alt={`QR code de retrait de la commande ${orderReference}`}
          width={160}
          height={160}
          className="h-40 w-40 rounded-xl border border-border bg-surface"
        />
      ) : (
        <div
          role="img"
          aria-label={`QR code de retrait de la commande ${orderReference} (aperçu, génération réelle à intégrer)`}
          className="flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface"
        >
          <Icon name="qr-code" size={64} className="text-muted-foreground" decorative />
        </div>
      )}
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
