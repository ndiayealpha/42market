import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { Card } from "@/src/components/atoms/Card/Card";

interface Challenge {
  icon: IconName;
  title: string;
  description: string;
  tag: string;
}

const CHALLENGES: Challenge[] = [
  {
    icon: "truck",
    title: "Parcourir des kilomètres",
    description:
      "Prendre deux métros, un RER et un bus un samedi pluvieux, sans aucune garantie que l'épicerie ait reçu le bissap frais, le piment végétarien ou l'igname souhaitée.",
    tag: "Jusqu'à 3h perdues par semaine",
  },
  {
    icon: "tag",
    title: "Des prix exorbitants",
    description:
      "Subir les marges démesurées de revendeurs en ligne ou de plateformes sans scrupule, qui profitent de la rareté apparente pour doubler les tarifs réels.",
    tag: "+60% de surcoût moyen en ligne",
  },
  {
    icon: "store",
    title: "Courir 4 magasins différents",
    description: "Un commerce pour le piment habanero, un deuxième pour le manioc frais, un troisième pour les épices rares. La fragmentation permanente d'un même repas.",
    tag: "Éparpillement et fatigue d'achat",
  },
];

export function ChallengesSection() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="max-w-2xl">
        <p className="text-[13px] font-bold uppercase text-ink-muted">Avant 42 Markets</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Le parcours du combattant culinaire</h2>
        <p className="mt-2 text-sm text-ink-muted sm:text-base">
          Trouver un paquet de fonio ou du vrai poivre de Penja ne devrait jamais demander un jour de congé ou un salaire entier.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {CHALLENGES.map((challenge) => (
          <Card key={challenge.title} variant="elevated" className="flex flex-col items-start gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-catalog-badge-cream">
              <Icon name={challenge.icon} size={18} className="text-foreground-strong" decorative />
            </span>
            <h3 className="text-base font-bold text-foreground-strong">{challenge.title}</h3>
            <p className="text-sm text-ink-muted">{challenge.description}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-3 py-1.5 text-xs font-bold text-danger">
              <Icon name="close" size={12} decorative />
              {challenge.tag}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
