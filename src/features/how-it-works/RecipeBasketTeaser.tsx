import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

export function RecipeBasketTeaser() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl bg-catalog-badge-cream/40 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Chip tone="cream" size="sm" shape="pill" uppercase className="font-bold">
          Exemple Recette-Panier
        </Chip>
        <h2 className="mt-2 text-lg font-extrabold text-foreground-strong sm:text-xl">Un Mafé authentique ou un Colombo maison en 1 clic</h2>
        <p className="mt-1 max-w-xl text-sm text-ink-muted">
          Choisissez une recette traditionnelle : 42 Markets coche automatiquement la pâte d&apos;arachide artisanale, les gombos frais et la viande chez
          l&apos;épicerie la plus proche.
        </p>
      </div>
      <ButtonLink variant="primary-md" href={routes.main.recipes} icon={<Icon name="cooking" size={16} />} className="shrink-0">
        Découvrir les Paniers Recettes
      </ButtonLink>
    </div>
  );
}
