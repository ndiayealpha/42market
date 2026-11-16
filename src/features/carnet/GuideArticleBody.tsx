import Link from "next/link";

import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { ArticleLinkedProduct } from "@/src/domain/article";
import { formatDistance } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

import { ArticleLinkedProductCard } from "./ArticleLinkedProductCard";

const SPICE_PROFILES = [
  { name: "Poivre de Penja", family: "Piper Guineense / Nigrum", profile: "L'aristocrate noir et blanc : boisé, mentholé, camphre léger, cuir blond frais." },
  { name: "Maniguette", family: "Aframomum Melegueta", profile: "Fraîcheur agrume, chaleur cardamome, notes zestées de bergamote, résine de pin." },
  { name: "Soumbala (Nététou)", family: "Parkia Biglobosa", profile: "L'umami fromager, bouillon de champignon séché, cacao torréfié, salinité naturelle." },
];

const TORREFACTION_STEPS = [
  { order: "01", title: "Le choc thermique à sec", description: "Faites chauffer une poêle en fonte brute sans matière grasse. Déposez les baies entières. Faites rouler 60 à 90 secondes jusqu'aux premiers crépitements et effluves de sève." },
  { order: "02", title: "Le refroidissement cristallin", description: "Transvasez immédiatement les grains encore brûlants sur une coupelle en céramique froide. Cette rupture thermique fige les huiles essentielles sous le choc, fragiles mais intactes." },
  { order: "03", title: "Le concassage en spirale", description: "Travaillez au mortier de granit lourd par mouvements rotatifs, jamais violents. Visez une texture « mignonnette » grossière pour conserver les cristaux intacts." },
];

export interface GuideArticleBodyProps {
  linkedProducts: ArticleLinkedProduct[];
  storeOptions: { slug: string; name: string; distanceMeters: number; pickupMinutes: number }[];
}

export function GuideArticleBody({ linkedProducts, storeOptions }: GuideArticleBodyProps) {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-foreground-strong">Pourquoi le Poivre de Penja bénéficie de la première IGP africaine</h2>
        <p className="text-sm text-ink-muted">
          Niché sur les flancs du Mont Koupé dans la vallée verdoyante du Moungo au Cameroun, le terroir de Penja est une curiosité pédologique
          rare. Reconnu en 2013 par l&apos;OAPI, le Poivre de Penja est devenu la première Indication Géographique Protégée du continent africain :
          contrairement aux poivres industriels récoltés à la machine, chaque grappe est cueillie à la main lorsque les baies virent à
          l&apos;écarlate, puis immergées dans des eaux pures de sources volcaniques avant un séchage lent sous le soleil équatorial.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-foreground-strong">La matrice sensorielle des 3 trésors</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SPICE_PROFILES.map((spice) => (
            <Card key={spice.name} variant="elevated" className="flex flex-col gap-1.5">
              <p className="text-[11px] font-semibold uppercase text-muted-foreground">{spice.family}</p>
              <p className="text-base font-bold text-foreground-strong">{spice.name}</p>
              <p className="text-sm text-ink-muted">{spice.profile}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-foreground-strong">L&apos;art de la torréfaction douce au mortier</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TORREFACTION_STEPS.map((step) => (
            <div key={step.order} className="flex flex-col gap-2 rounded-xl bg-surface-subtle p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground-strong text-xs font-extrabold text-white">{step.order}</span>
              <p className="text-sm font-bold text-foreground-strong">{step.title}</p>
              <p className="text-xs text-ink-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {storeOptions.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-extrabold text-foreground-strong">Où dénicher ces épices à Saint-Étienne aujourd&apos;hui ?</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {storeOptions.map((store) => (
              <Link key={store.slug} href={routes.main.epicerieDetail(store.slug)} className="flex flex-col gap-1 rounded-xl bg-surface-subtle p-3">
                <p className="text-sm font-bold text-foreground-strong">{store.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="location" size={12} /> {formatDistance(store.distanceMeters)}
                </p>
                <p className="flex items-center gap-1 text-xs text-success">
                  <Icon name="zap" size={12} /> Retrait {store.pickupMinutes} min
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {linkedProducts.length > 0 && (
        <section className="flex flex-col gap-4 rounded-2xl bg-foreground p-5 text-white">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/70">
            <Icon name="basket" size={14} /> Expédition groupée · en direct des producteurs
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {linkedProducts.map((product) => (
              <ArticleLinkedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-foreground-strong">Questions fréquentes de notre sommelière</h2>
        <details className="rounded-xl bg-surface-subtle p-4" open>
          <summary className="cursor-pointer text-sm font-bold text-foreground-strong">Comment conserver le Soumbala sans embaumer toute la cuisine ?</summary>
          <p className="mt-2 text-sm text-ink-muted">
            Le Soumbala traditionnel dégage un parfum fermenté très puissant dû à son affinage bactérien naturel. Conservez-le impérativement dans
            un bocal hermétique, à l&apos;abri total de la lumière et de l&apos;air, ou divisez-le en billes régulières et congelez-le : les
            qualités gustatives demeurent intactes durant 18 mois.
          </p>
        </details>
        <details className="rounded-xl bg-surface-subtle p-4">
          <summary className="cursor-pointer text-sm font-bold text-foreground-strong">Quelles alternatives utiliser si je n&apos;ai pas de Poivre de Penja sous la main ?</summary>
          <p className="mt-2 text-sm text-ink-muted">
            Privilégiez un poivre noir de Tellicherry de très gros calibre associé à une touche minime de poivre de Kampot sel pour reproduire son
            profil boisé et animal.
          </p>
        </details>
      </section>
    </div>
  );
}
