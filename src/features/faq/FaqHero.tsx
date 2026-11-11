import { Chip } from "@/src/components/atoms/Chip/Chip";

export function FaqHero() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Chip tone="cream" size="sm" shape="pill" uppercase className="font-bold">
        Foire Aux Questions
      </Chip>
      <h1 className="max-w-2xl text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
        FAQ Diaspora &amp; Connaissance du Marché
      </h1>
      <p className="max-w-2xl text-sm text-ink-muted sm:text-base">
        Réponses concrètes et transparentes aux questions que notre communauté se pose tous les jours au comptoir.
      </p>
    </div>
  );
}
