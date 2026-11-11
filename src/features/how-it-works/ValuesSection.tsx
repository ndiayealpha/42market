import { Card } from "@/src/components/atoms/Card/Card";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";
import { HOW_IT_WORKS_VALUES } from "./HowItWorks.constants";

export function ValuesSection() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="max-w-2xl">
        <Eyebrow className="justify-center">Nos valeurs</Eyebrow>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Les 3 Engagements 42 Markets</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Nous avons conçu cette plateforme en respectant ceux qui cultivent, importent et vendent ces trésors culinaires au quotidien.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {HOW_IT_WORKS_VALUES.map((value) => (
          <Card key={value.title} variant="elevated" className="flex flex-col items-start gap-3 text-left">
            <IconTile icon={value.icon} tone="cream" size={40} />
            <Eyebrow>{value.eyebrowLabel}</Eyebrow>
            <h3 className="text-base font-bold text-foreground-strong">{value.title}</h3>
            <p className="text-sm text-ink-muted">{value.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
