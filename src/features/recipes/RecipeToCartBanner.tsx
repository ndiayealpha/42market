import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { formatRecipeCountLabel } from "@/src/domain/recipe";

export interface RecipeToCartBannerProps {
  totalCount: number;
}

const STEPS: { icon: IconName; title: string; getSubtitle: (totalCount: number) => string }[] = [
  { icon: "cooking", title: "Choisissez un plat", getSubtitle: (count) => `${formatRecipeCountLabel(count)} authentiques` },
  { icon: "check-circle", title: "Ingrédients cochés", getSubtitle: () => "En stock chez vos épiciers" },
  { icon: "basket", title: "Prêt en 15 min", getSubtitle: () => "Cabas Click & Collect gratuit" },
];

export function RecipeToCartBanner({ totalCount }: RecipeToCartBannerProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-catalog-badge-cream/40 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2 text-sm font-bold text-foreground-strong">
        <Icon name="zap" size={18} />
        Comment fonctionne le Recette-to-Cart ?
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        {STEPS.map((step, index) => (
          <div key={step.title} className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground-strong text-xs font-extrabold text-white">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-bold text-foreground-strong">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.getSubtitle(totalCount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
