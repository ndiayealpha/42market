import { PromoCard, type PromoCardLayout, type PromoCardProps } from "@/src/components/organisms/PromoCard/PromoCard";
import { PromoSection } from "@/src/components/organisms/PromoSection/PromoSection";
import { PROMO_ITEMS, PROMO_SECTION_CONTENT } from "@/src/components/organisms/PromoSection/PromoSection.data";
import { PROMO_THEMES, type PromoThemeName } from "@/src/components/organisms/PromoCard/PromoCard.themes";

const LAYOUTS: { layout: PromoCardLayout; label: string }[] = [
  { layout: "media-framed", label: "media-framed" },
  { layout: "media-bleed", label: "media-bleed" },
  { layout: "text", label: "text" },
];

const THEME_NAMES = Object.keys(PROMO_THEMES) as PromoThemeName[];

/** One representative card per (layout, theme) pair — same content shape per layout, only the theme changes. */
function swatchProps(layout: PromoCardLayout, theme: PromoThemeName): PromoCardProps {
  const base = {
    theme,
    badge: { label: theme, secondaryLabel: layout === "media-framed" ? "Démo thème" : undefined },
    href: "#",
    ctaLabel: `Voir l'offre : thème ${theme}`,
  } satisfies Partial<PromoCardProps>;

  if (layout === "text") {
    return {
      ...base,
      layout,
      title: "Titre de l'offre",
      description: "Description courte de l'offre pour illustrer le thème sur fond plein.",
      tag: "Étiquette",
      glow: theme === "bordeaux",
      price: { prefix: "Lot", amount: 7.9, oldAmount: 12.5 },
    };
  }

  return {
    ...base,
    layout,
    title: "Titre de l'offre",
    subtitle: "Sous-titre illustrant le thème",
    tag: "Étiquette",
    media: { src: "/login-info-thumbnail.jpg", alt: "", ratio: "4/3" },
    stickers:
      layout === "media-framed"
        ? [{ shape: "pill", color: "promo-red", anchor: "top-right", rotate: 6, price: { amount: 9.9, oldAmount: 14.9 } }]
        : undefined,
  };
}

/**
 * Proof page for the promo-carousel task: the real section exactly as it
 * renders in the dashboard, plus a "3 layouts × 6 thèmes" swatch board
 * built from the same `PromoCard` — nothing banner-specific exists, so
 * every cell below is the identical component with different props.
 */
export function PromoDemoView() {
  return (
    <div className="pb-16">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground-strong">Démo — Offres en cours &amp; Arrivages</h1>
        <p className="mt-2 text-sm text-ink-muted">
          1. La section réelle (données de <code>PromoSection.data.ts</code>). 2. La planche 3 layouts × 6 thèmes, pour
          prouver que chaque variante n&apos;est qu&apos;un jeu de props sur le même <code>PromoCard</code>.
        </p>
      </section>

      <PromoSection
        kicker={PROMO_SECTION_CONTENT.kicker}
        meta={`Mis à jour en direct · ${PROMO_SECTION_CONTENT.totalCount} offres actives à Saint-Étienne`}
        title={PROMO_SECTION_CONTENT.title}
        totalCount={PROMO_SECTION_CONTENT.totalCount}
        seeAll={PROMO_SECTION_CONTENT.seeAll}
        hint={PROMO_SECTION_CONTENT.hint}
        items={PROMO_ITEMS}
      />

      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6" aria-label="Planche 3 layouts × 6 thèmes">
        <h2 className="text-xl font-semibold text-foreground-strong">Planche : 3 layouts × 6 thèmes</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Même composant, aucune carte dédiée à un thème ou à une bannière — seul le contenu change entre les
          cellules.
        </p>

        <div className="mt-6 flex flex-col gap-10">
          {LAYOUTS.map(({ layout, label }) => (
            <div key={layout}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{label}</h3>
              <div className="mt-3 flex flex-wrap gap-4">
                {THEME_NAMES.map((theme) => (
                  <div key={theme} className="h-[260px] w-[300px] shrink-0 md:h-[280px] md:w-[320px]">
                    <PromoCard {...swatchProps(layout, theme)} className="!w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
