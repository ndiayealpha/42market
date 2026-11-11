import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Card } from "@/src/components/atoms/Card/Card";
import type { HowItWorksStep } from "./HowItWorks.constants";

export interface HowItWorksStepCardProps {
  step: HowItWorksStep;
}

export function HowItWorksStepCard({ step }: HowItWorksStepCardProps) {
  return (
    <Card variant="elevated" className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <span className="text-2xl font-extrabold text-catalog-line">{step.number}</span>
        <IconTile icon={step.icon} tone="cream" size={40} />
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground-strong">{step.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
      </div>
      {/* Informative only, per spec — a `<span>`, never a `<button>`. */}
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground-strong px-3 py-1.5 text-xs font-bold text-white">
        <Icon name="check-circle" size={14} />
        {step.confirmationLabel}
      </span>
    </Card>
  );
}
