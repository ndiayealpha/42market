import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";

import { MERCHANT_STEPS } from "./merchant-onboarding.constants";

export function MerchantStepsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {MERCHANT_STEPS.map((step) => (
        <Card key={step.number} variant="elevated" className="flex flex-col items-start gap-3">
          <div className="flex w-full items-start justify-between">
            <span className="text-2xl font-extrabold text-catalog-line">{step.number}</span>
            <IconTile icon={step.icon} tone="cream" size={40} />
          </div>
          <h3 className="text-base font-bold text-foreground-strong">{step.title}</h3>
          <p className="text-sm text-ink-muted">{step.description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 rounded-full bg-success-subtle px-3 py-1.5 text-xs font-bold text-success">
            <Icon name="check-circle" size={14} decorative />
            {step.bullet}
          </span>
        </Card>
      ))}
    </div>
  );
}
