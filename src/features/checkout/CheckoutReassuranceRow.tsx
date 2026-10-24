import type { IconName } from "@/src/components/atoms/Icon/Icon";
import { InfoTile } from "@/src/components/molecules/InfoTile/InfoTile";

export interface CheckoutReassuranceRowProps {
  /** The SMS tile only shows when the account's phone is verified — mirrors the Notifications page's own "Alertes SMS" gating (`isPhoneVerified`). */
  isPhoneVerified: boolean;
}

interface ReassuranceTile {
  icon: IconName;
  title: string;
  subtitle: string;
}

const SMS_TILE: ReassuranceTile = { icon: "bell", title: "Alerte SMS en direct", subtitle: "Dès que le sac est prêt" };

// "Sans engagement" has no real cancellation feature behind it anywhere in
// the app (Phase 0 audit) — shown as a presentational reassurance promise
// only, same as the brief's own documented "promesses sans fonctionnalité".
const ALWAYS_ON_TILES: ReassuranceTile[] = [
  { icon: "package", title: "Chaîne du froid 100%", subtitle: "Consigne tempérée 4°C" },
  { icon: "check-circle", title: "Sans engagement", subtitle: "Annulation en 1 clic" },
];

/** K5 — 3 `InfoTile`s (`layout="tile"`) from a small local config table. */
export function CheckoutReassuranceRow({ isPhoneVerified }: CheckoutReassuranceRowProps) {
  const tiles = isPhoneVerified ? [SMS_TILE, ...ALWAYS_ON_TILES] : ALWAYS_ON_TILES;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {tiles.map((tile) => (
        <InfoTile key={tile.title} layout="tile" icon={tile.icon} title={tile.title} subtitle={tile.subtitle} />
      ))}
    </div>
  );
}
