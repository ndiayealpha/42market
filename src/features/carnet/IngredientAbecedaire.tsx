import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

const ENTRIES = [
  { letter: "M", tag: "Féculent star", title: "Manioc & Attiéké", description: "Semoule de manioc fermentée — se réchauffe à la vapeur, jamais au micro-ondes, pour garder son moelleux." },
  { letter: "H", tag: "Boisson & Infusion", title: "Fleurs d'Hibiscus", description: "Infusion froide lente (12h) contre décoction chaude express. Se marie à la menthe fraîche et à la vanille." },
  { letter: "P", tag: "Légume-fruit", title: "Banane Plantain", description: "Du vert ferme et salé au jaune taché de noir pour des beignets fondants et naturellement caramélisés." },
  { letter: "G", tag: "Légume texture", title: "Le Gombo (Okra)", description: "Pour maîtriser le mucilage : coupez-le séché pour garder du croquant, ou laissez-le lier veloutées et sauces longues." },
];

export function IngredientAbecedaire() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
          <Icon name="leaf" size={14} /> Guide pédagogique
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-foreground-strong">L&apos;Abécédaire des Ingrédients Exotiques</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          Ne passez plus à côté d&apos;une saveur par hésitation. Nos fiches pratiques pour apprivoiser et cuisiner les essentiels du monde en toute
          confiance.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ENTRIES.map((entry) => (
          <Link key={entry.letter} href={routes.main.recipes} className="flex flex-col gap-2 rounded-2xl bg-surface p-4 shadow-card">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-catalog-chip text-sm font-extrabold text-foreground-strong">
                {entry.letter}
              </span>
              <span className="text-[11px] font-semibold uppercase text-muted-foreground">{entry.tag}</span>
            </div>
            <p className="text-sm font-bold text-foreground-strong">{entry.title}</p>
            <p className="text-xs text-ink-muted">{entry.description}</p>
            <span className="mt-auto flex items-center gap-1 text-xs font-bold text-foreground-strong">
              Voir les recettes
              <Icon name="arrow-right" size={12} decorative />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
