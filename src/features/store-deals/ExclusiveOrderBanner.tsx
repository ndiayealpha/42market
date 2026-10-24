import { Chip } from "@/src/components/atoms/Chip/Chip";
import { MetaChip } from "@/src/components/atoms/MetaChip/MetaChip";
import { InfoBanner } from "@/src/components/organisms/InfoBanner/InfoBanner";
import { EXPRESS_PICKUP_CONFIG } from "@/src/domain/store-deals";

/** D1 — explains the mono-store cart rule up front, before any product is added. */
export function ExclusiveOrderBanner() {
  return (
    <InfoBanner
      icon="store"
      title={
        <>
          Commande exclusive par boutique
          <Chip tone="dark" size="sm" shape="pill" uppercase>
            Click &amp; Collect 42
          </Chip>
        </>
      }
      description="Chaque panier est rattaché à une seule épicerie partenaire pour un retrait sans frais en 15 à 30 minutes, garanti frais et préparé avec soin."
      trailing={
        <>
          <MetaChip icon="clock" label={EXPRESS_PICKUP_CONFIG.etaRangeLabel} />
          <MetaChip icon="check-circle" label={EXPRESS_PICKUP_CONFIG.freeFeeLabel} />
        </>
      }
    />
  );
}
