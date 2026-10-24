import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { HighlightedText } from "@/src/components/atoms/HighlightedText/HighlightedText";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { HighlightSegment, SponsoredParcel } from "@/src/domain/store-merchandising";
import { formatLongDate } from "@/src/lib/format";

export interface SponsoredParcelBannerProps {
  parcel: SponsoredParcel;
}

function buildMessage(parcel: SponsoredParcel): HighlightSegment[] {
  const pickupDay = new Date(`${parcel.pickupDeadline}T00:00:00Z`).getUTCDate();
  return [
    { text: "Départ " },
    { text: `${parcel.origin} vers le ${parcel.destination}`, emphasis: "link" },
    { text: " prévu le " },
    { text: formatLongDate(parcel.departureDate), emphasis: "accent" },
    { text: `. Fin de ramassage le ${pickupDay} directement au comptoir de l'épicerie.` },
  ];
}

export function SponsoredParcelBanner({ parcel }: SponsoredParcelBannerProps) {
  return (
    <BannerSurface tone="brown" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Icon name="archive" size={22} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-extrabold text-store-accent-gold">Envoi de colis</h2>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
              Sponsorisé
            </span>
          </div>
          <p className="mt-1 text-sm text-white/80">
            <HighlightedText segments={buildMessage(parcel)} />
          </p>
        </div>
      </div>

      <BannerCta href={parcel.href} className="self-start sm:self-auto">
        En savoir plus sur les départs
      </BannerCta>
    </BannerSurface>
  );
}
