import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";

export function MerchantFinalCta() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-catalog-badge-cream/40 px-6 py-10 text-center">
      <IconTile icon="store" tone="cream" size={48} />
      <h2 className="max-w-xl text-xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-2xl">
        Faisons rayonner le savoir-faire de nos origines dans la diaspora.
      </h2>
      <p className="max-w-lg text-sm text-ink-muted">Prenez 2 minutes aujourd&apos;hui pour poser les bases de votre nouvelle vitrine digitale sans engagement.</p>
      <ButtonLink href="#formulaire" variant="primary-lg" icon={<Icon name="arrow-right" size={16} decorative />}>
        Ouvrir mon étal 42 Markets
      </ButtonLink>
    </div>
  );
}
