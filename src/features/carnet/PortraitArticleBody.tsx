import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { RatingBadge } from "@/src/components/atoms/RatingBadge/RatingBadge";
import type { ArticleLinkedProduct } from "@/src/domain/article";
import { buildStorePromoDirectionsUrl, getStorePromoOpeningStatus, type StorePromoSummary } from "@/src/domain/promotions";
import { formatNumber } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

import { ArticleLinkedProductCard } from "./ArticleLinkedProductCard";

export interface PortraitArticleBodyProps {
  store: StorePromoSummary | null;
  linkedProducts: ArticleLinkedProduct[];
  now: Date;
}

const VISITOR_QUOTES = [
  { name: "Mireille, 68 ans", role: "Habitante de la rue Bergson depuis 1982", quote: "Quand j'ai perdu mon mari, Fatou m'a appris à faire le bouillon de gingembre pour retrouver l'appétit. On ne parle pas de grande distribution ici, on parle de famille." },
  { name: "Karim, 29 ans", role: "Chef cuisinier nomade à Saint-Étienne", quote: "Leurs racines de vétiver et leurs piments habanero séchés sont d'un niveau introuvable chez les grossistes. Le Click & Collect me fait gagner une heure précieuse avant mes services." },
];

export function PortraitArticleBody({ store, linkedProducts, now }: PortraitArticleBodyProps) {
  const openingStatus = store ? getStorePromoOpeningStatus(store, now) : null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-extrabold text-foreground-strong">Chapitre I — De la malle en fer aux rayons connectés</h2>
          <p className="text-sm text-ink-muted">
            Il est six heures et quart lorsque le volet roulant métallique de la rue Bergson grince dans la brume stéphanoise. À l&apos;intérieur,
            les caisses en bois brut s&apos;alignent déjà sous les ampoules chaudes à filament. « Quand nous sommes arrivés du Sénégal en 1999 avec
            deux valises et un carnet d&apos;adresses griffonné au crayon de bois, le quartier Carnot n&apos;avait pas d&apos;épicerie dédiée aux
            produits subsahariens et créoles », se souviennent les propriétaires. On a commencé avec un camion d&apos;occasion sur la place du
            marché, puis cette boutique a ouvert ses portes en 2003.
          </p>
        </section>

        <blockquote className="rounded-xl bg-catalog-badge-cream/40 p-4 text-sm font-semibold text-foreground-strong">
          « Notre boutique n&apos;est pas qu&apos;un magasin, c&apos;est un consulat informel et une mémoire vivante des goûts du pays. On ne vend
          pas seulement une graine : on explique d&apos;où vient la pluie qui l&apos;a fait germer. »
        </blockquote>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-extrabold text-foreground-strong">Chapitre II — L&apos;obsession du bon produit</h2>
          <p className="text-sm text-ink-muted">
            Ici, pas d&apos;intermédiaires nébuleux. Deux fois par an, un voyage est organisé vers le village natal pour auditer les petites
            coopératives féminines qui récoltent le baobab et le fonio biologique. Chaque arrivage est inspecté grain par grain avant de rejoindre
            les rayons de la boutique partenaire.
          </p>
        </section>

        {VISITOR_QUOTES.length > 0 && (
          <section className="flex flex-col gap-3 border-t border-border pt-4">
            <h2 className="text-base font-extrabold text-foreground-strong">Les visages du quartier : histoires de comptoir</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {VISITOR_QUOTES.map((visitor) => (
                <div key={visitor.name} className="rounded-xl bg-surface-subtle p-3">
                  <p className="text-sm text-ink-muted">« {visitor.quote} »</p>
                  <p className="mt-2 text-xs font-bold text-foreground-strong">{visitor.name}</p>
                  <p className="text-xs text-muted-foreground">{visitor.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {store && (
          <div className="rounded-2xl bg-surface p-4 shadow-card">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-success">
              <Icon name="check-circle" size={14} /> Partenaire certifié 42 Markets
            </p>
            <p className="mt-1 text-lg font-extrabold text-foreground-strong">{store.name}</p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <RatingBadge value={store.rating.average} size="sm" /> ({formatNumber(store.rating.reviewCount)} avis)
            </p>
            <p className="mt-2 text-sm text-ink-muted">{store.address}</p>
            {openingStatus && (
              <p className={`mt-1 text-sm font-semibold ${openingStatus.isOpen ? "text-success" : "text-danger"}`}>{openingStatus.label}</p>
            )}
            <div className="mt-3 flex flex-col gap-2">
              <ButtonLink href={routes.main.epicerieDetail(store.slug)} variant="primary-md" className="justify-center">
                Visiter la boutique en ligne
              </ButtonLink>
              <a
                href={buildStorePromoDirectionsUrl(store.address)}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-sm font-bold text-foreground-strong"
              >
                <Icon name="location" size={14} />
                Voir l&apos;itinéraire
              </a>
            </div>
          </div>
        )}

        {linkedProducts.length > 0 && (
          <div className="rounded-2xl bg-surface p-4 shadow-card">
            <p className="text-sm font-bold text-foreground-strong">Leurs 3 pépites secrètes recommandées</p>
            <p className="mt-1 text-xs text-muted-foreground">Testées, approuvées et cuisinées en famille.</p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {linkedProducts.map((product) => (
                <ArticleLinkedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
