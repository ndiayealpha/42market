import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";

/** Founders' name spelled "Amadou" consistently — the maquette itself switches between "Amadou" (heading) and "Ahmadou" (card caption); one canonical spelling is used everywhere here, same resolution rule as the pricing/rating inconsistencies in the Carnet du Terroir mission. No real portrait exists for these fictional founders — `Avatar` falls back to initials rather than a fabricated photo. */
export function ManifestoSection() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-catalog-badge-cream px-3 py-1.5 text-[13px] font-bold uppercase text-foreground-strong">
        <Icon name="archive" size={14} decorative />
        Genèse d&apos;une mission
      </span>
      <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Le manifeste de Sam &amp; Amadou</h2>

      <BannerSurface tone="brown" className="w-full px-6 py-10 sm:px-12">
        <blockquote className="mx-auto max-w-3xl text-base italic leading-relaxed text-white/90 sm:text-lg">
          « Je connais cette sensation. Tu arrives dans un nouveau pays avec tes rêves, tes projets et l&apos;envie de construire quelque chose de
          meilleur. Puis un jour, sans prévenir, une odeur, un plat ou un simple ingrédient te manque. Tu repenses aux repas en famille, aux marchés
          animés du dimanche matin, au bruit des mortiers, aux recettes transmises de bouche à oreille par ta mère, ton père ou ta grand-mère… »
        </blockquote>
        <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3 border-t border-white/15 pt-6">
          <Avatar name="Sam Amadou" size={44} />
          <div className="text-left">
            <p className="text-sm font-bold text-white">Sam &amp; Amadou</p>
            <p className="text-xs text-white/70">Co-fondateurs de 42 Markets · Rennes &amp; Saint-Étienne</p>
          </div>
        </div>
      </BannerSurface>
    </div>
  );
}
