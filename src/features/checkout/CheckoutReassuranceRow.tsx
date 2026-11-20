import type { IconName } from "@/src/components/atoms/Icon/Icon";
import { InfoTile } from "@/src/components/molecules/InfoTile/InfoTile";

export interface CheckoutReassuranceRowProps {
  /**
   * The e-mail alert tile only shows when `isPhoneVerified` is true — kept
   * as-is (N4 only asked to replace the SMS wording, not the gate): this
   * flag was never really about SMS capability specifically, it mirrors
   * whatever "verified contact info" check the Notifications page already
   * uses. Flagged in the mission report as worth a real "has a usable
   * e-mail" check instead, out of scope here.
   */
  isPhoneVerified: boolean;
}

interface ReassuranceTile {
  icon: IconName;
  title: string;
  subtitle: string;
}

const EMAIL_ALERT_TILE: ReassuranceTile = { icon: "bell", title: "Alerte e-mail en direct", subtitle: "Dès que le sac est prêt" };

// "Sans engagement" has no real cancellation feature behind it anywhere in
// the app (Phase 0 audit) — shown as a presentational reassurance promise
// only, same as the brief's own documented "promesses sans fonctionnalité".
const ALWAYS_ON_TILES: ReassuranceTile[] = [
  { icon: "package", title: "Chaîne du froid 100%", subtitle: "Consigne tempérée 4°C" },
  { icon: "check-circle", title: "Sans engagement", subtitle: "Annulation en 1 clic" },
];

/** K5 — 3 `InfoTile`s (`layout="tile"`) from a small local config table. */
export function CheckoutReassuranceRow({ isPhoneVerified }: CheckoutReassuranceRowProps) {
  const tiles = isPhoneVerified ? [EMAIL_ALERT_TILE, ...ALWAYS_ON_TILES] : ALWAYS_ON_TILES;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {tiles.map((tile) => (
        <InfoTile key={tile.title} layout="tile" icon={tile.icon} title={tile.title} subtitle={tile.subtitle} />
      ))}
    </div>
  );
}
