import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";

export function HowItWorksHero() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Eyebrow className="justify-center">Le parcours en 4 étapes</Eyebrow>
      <h1 className="max-w-2xl text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Comment ça marche ?</h1>
      <p className="max-w-2xl text-sm text-ink-muted sm:text-base">
        Une interface épurée pensée pour la règle des 3 clics : trouvez vos denrées en quelques secondes sans perdre votre après-midi.
      </p>
      <Chip tone="gold" size="sm" shape="pill" uppercase className="font-bold">
        Simple • Rapide • Sans engagement
      </Chip>
    </div>
  );
}
