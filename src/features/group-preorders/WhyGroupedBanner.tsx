import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { InfoTile } from "@/src/components/molecules/InfoTile/InfoTile";

const REASONS: { icon: "check-circle" | "credit-card" | "shield" | "store"; title: string; subtitle: string }[] = [
  { icon: "check-circle", title: "Zéro perte magasin", subtitle: "100% des produits importés sont attribués." },
  { icon: "credit-card", title: "Pouvoir d'achat", subtitle: "Tarifs grossistes accessibles aux particuliers." },
  { icon: "shield", title: "Contrôle sanitaire", subtitle: "Traçabilité certifiée et agréée DGCCRF." },
  { icon: "store", title: "Commerces vivants", subtitle: "Vous soutenez les boutiques stéphanoises." },
];

/** D4-style dark `BannerSurface`, stacked instead of inline (text above, a 2x2 reassurance grid below) since there's no single CTA here to put on the right. */
export function WhyGroupedBanner() {
  return (
    <BannerSurface tone="brown" className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
      <div className="sm:max-w-sm">
        <Chip tone="cream" size="sm" shape="pill" icon={<Icon name="leaf" size={12} decorative />} uppercase className="self-start">
          Économie Sociale et Solidaire dans la Loire
        </Chip>
        <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-[28px]">Pourquoi commander groupé avec 42 Markets ?</h2>
        <p className="mt-2 text-sm text-white/80">
          Le modèle des précommandes élimine 100% du gaspillage alimentaire pour les épiceries indépendantes. En achetant uniquement les volumes
          déjà commandés, nos épiciers peuvent négocier directement avec les coopératives paysannes d&apos;Afrique de l&apos;Ouest sans supporter
          le coût du stockage invendu.
        </p>
      </div>
      <ul role="list" className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {REASONS.map((reason) => (
          <li key={reason.title}>
            <InfoTile icon={reason.icon} title={reason.title} subtitle={reason.subtitle} layout="tile" />
          </li>
        ))}
      </ul>
    </BannerSurface>
  );
}
