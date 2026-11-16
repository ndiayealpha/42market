import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { getAllIngredientIds, getPrimaryStoreOption, getRecipeBasketTotal, type Recipe } from "@/src/domain/recipe";
import { formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface RecetteArticleBodyProps {
  recipe: Recipe | null;
}

export function RecetteArticleBody({ recipe }: RecetteArticleBodyProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-xl bg-catalog-badge-cream/40 p-4 text-sm font-semibold text-foreground-strong">
          Inscrit au patrimoine immatériel de l&apos;UNESCO, le Ceebu Jën (Thiéboudienne) n&apos;est pas seulement le plat fétiche des dimanches
          sénégalais : c&apos;est une leçon d&apos;économie rurale, d&apos;ingéniosité et de générosité partagée.
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-extrabold text-foreground-strong">01 — Le geste ancestral &amp; l&apos;héritage de Penda Mbaye</h2>
          <p className="text-sm text-ink-muted">
            Au XIXe siècle, dans l&apos;ancienne capitale coloniale de Saint-Louis (Ndar), une pénurie de blé pousse une cuisinière d&apos;exception à
            improviser. En mariant les arrivages de poissons frais de l&apos;embouchure du fleuve Sénégal aux cargaisons de riz asiatique concassé,
            elle crée le chef-d&apos;œuvre de la « Teranga » (hospitalité sénégalaise).
          </p>
          <p className="text-sm text-ink-muted">
            La véritable révolution réside dans l&apos;utilisation du riz brisé deux fois (« Gañe ») : cette granulométrie particulière permet
            d&apos;absorber jusqu&apos;à trois fois son volume de bouillon concentré sans jamais s&apos;empâter. Chaque grain reste distinct, infusé
            de la couleur du concentré de tomate et du parfum envoûtant des poissons séchés traditionnels.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-extrabold text-foreground-strong">02 — Les 4 étapes clés de la marmite</h2>
          <p className="text-sm text-ink-muted">
            Farcir généreusement le poisson écaillé avec le pilonnage d&apos;herbes fraîches, dorer dans l&apos;huile d&apos;arachide fumante,
            infuser profondément le bouillon rouge, puis pré-cuire le riz à la vapeur dans le panier couscoussier posé au-dessus de la marmite
            fumante avant de l&apos;y plonger pour la cuisson à l&apos;étouffée finale.
          </p>
        </section>

        {recipe && (
          <div className="rounded-xl border border-catalog-line bg-surface p-4 text-sm text-ink-muted">
            <strong className="text-foreground-strong">Le conseil de l&apos;épicier pour remplacer le Yet :</strong> le Yet (mollusque fermenté et
            séché) apporte une note umami musquée inimitable. S&apos;il est épuisé en boutique, optez pour une alliance élégante : deux filets
            d&apos;anchois à l&apos;huile fondus à feux doux mêlés à une demi-cuillère de pâte de miso brun.
          </div>
        )}
      </div>

      <div>
        {recipe && (
          <Card variant="elevated" className="flex flex-col gap-3">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-muted-foreground">
              <Icon name="basket" size={14} /> Recipe-to-Cart direct
            </p>
            <p className="text-base font-extrabold text-foreground-strong">Panier Recette · {recipe.servings} Personnes</p>
            <p className="text-sm text-ink-muted">
              {recipe.detail.ingredients.length} ingrédients certifiés, en stock chez {getPrimaryStoreOption(recipe).storeName}.
            </p>
            <p className="text-2xl font-extrabold text-foreground-strong">
              {formatPrice(getRecipeBasketTotal(recipe, getPrimaryStoreOption(recipe).storeSlug, getAllIngredientIds(recipe)))}
            </p>
            <ButtonLink href={routes.main.recipeDetail(recipe.slug)} variant="primary-lg" className="justify-center">
              Voir la recette complète
            </ButtonLink>
          </Card>
        )}
      </div>
    </div>
  );
}
