"use client";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { ArticleLinkedProduct } from "@/src/domain/article";
import { useAddRecipeToCart } from "@/src/hooks/useAddRecipeToCart";
import { formatPrice } from "@/src/lib/format";

import { ArticleLinkedProductCard } from "./ArticleLinkedProductCard";

export interface AntiGaspiArticleBodyProps {
  flashProducts: ArticleLinkedProduct[];
}

const MATURITY_STAGES = [
  { stage: "Stade 1 : Vert vif", sugarPercent: "75% amidon", texture: "Ferme, chair dense. Idéal pour chips salées ou bouilli." },
  { stage: "Stade 2 : Jaune tacheté", sugarPercent: "50/50", texture: "Polyvalence idéale. Cuisson au four, poêlée ou braisé à l'arachide." },
  { stage: "Stade 3 : Peau noire", sugarPercent: "85% fructose", texture: "L'apothéose pour l'Alloco fondant. Texture caramélisée naturellement sans sucre ajouté." },
];

const MINI_RECIPES = [
  {
    id: "alloco-croustillant",
    title: "Alloco croustillant à la fleur de sel",
    timeLabel: "15 min",
    storeSlug: "saveurs-dafrique",
    storeName: "Saveurs d'Afrique",
    ingredients: [
      { id: "alloco-plantains", name: "Plantains très mûrs", packagingLabel: "2 pièces", price: 1.2 },
      { id: "alloco-huile", name: "Huile d'arachide & fleur de sel", packagingLabel: "lot", price: 1.1 },
    ],
  },
  {
    id: "klaklo-ivoirien",
    title: "Klaklo ivoirien (beignets plantain, maïs & gingembre)",
    timeLabel: "20 min",
    storeSlug: "saveurs-dafrique",
    storeName: "Saveurs d'Afrique",
    ingredients: [
      { id: "klaklo-plantains", name: "Plantains surmûris", packagingLabel: "3 pièces", price: 1.7 },
      { id: "klaklo-farine", name: "Farine de maïs & gingembre râpé", packagingLabel: "lot", price: 1.4 },
    ],
  },
  {
    id: "coulis-mangue",
    title: "Coulis de mangue épicé au piment végétarien",
    timeLabel: "8 min",
    storeSlug: "loirivoire",
    storeName: "LoirIvoire",
    ingredients: [
      { id: "coulis-mangues", name: "Mangues Kent surmûries", packagingLabel: "2 pièces", price: 2.1 },
      { id: "coulis-piment", name: "Piment végétarien & citron vert", packagingLabel: "lot", price: 0.9 },
    ],
  },
];

export function AntiGaspiArticleBody({ flashProducts }: AntiGaspiArticleBodyProps) {
  const { addRecipeToCart, dialog } = useAddRecipeToCart();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-extrabold text-foreground-strong">La fausse rupture, la vraie maturité : pourquoi la peau noire est un trésor</h2>
          <p className="text-sm text-ink-muted">
            Dans les standards aseptisés des grandes surfaces, une banane tigrée ou noircie est condamnée à l&apos;arrachage de rayon. Pour les
            cuisiniers du golfe de Guinée, des Antilles et de la vallée du Bani, c&apos;est exactement l&apos;inverse : c&apos;est le commencement
            de la saveur.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {MATURITY_STAGES.map((stage) => (
              <div key={stage.stage} className="rounded-xl bg-surface-subtle p-3">
                <p className="text-sm font-bold text-foreground-strong">{stage.stage}</p>
                <p className="text-xs font-semibold text-success">{stage.sugarPercent}</p>
                <p className="mt-1 text-xs text-ink-muted">{stage.texture}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-border pt-4">
          <h2 className="text-lg font-extrabold text-foreground-strong">Les 5 Pépites Dorées du Placard</h2>
          <p className="text-sm text-ink-muted">Rapides et irrésistibles pour sublimer vos surplus de la semaine.</p>
          <div className="flex flex-col gap-3">
            {MINI_RECIPES.map((recipe) => {
              const total = recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
              return (
                <div key={recipe.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-subtle p-3">
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-foreground-strong">
                      <Icon name="clock" size={14} className="text-muted-foreground" />
                      {recipe.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {recipe.timeLabel} · {recipe.ingredients.map((i) => i.name).join(" · ")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addRecipeToCart({
                        storeSlug: recipe.storeSlug,
                        storeName: recipe.storeName,
                        items: recipe.ingredients.map((ingredient) => ({
                          id: ingredient.id,
                          name: ingredient.name,
                          packagingLabel: ingredient.packagingLabel,
                          price: ingredient.price,
                          image: { alt: ingredient.name },
                        })),
                      })
                    }
                    className="shrink-0 rounded-full bg-foreground-strong px-3 py-1.5 text-xs font-bold text-white hover:bg-catalog-cta-hover"
                  >
                    Ajouter les ingrédients ({formatPrice(total)})
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {flashProducts.length > 0 && (
        <div className="rounded-2xl bg-surface p-4 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-danger">
            <Icon name="zap" size={14} /> Ventes Flash · Date Courte
          </p>
          <p className="mt-2 text-sm font-bold text-foreground-strong">Réservez vos surplus en Click &amp; Collect</p>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {flashProducts.map((product) => (
              <ArticleLinkedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      {dialog}
    </div>
  );
}
