import { Card } from "@/src/components/atoms/Card/Card";
import type { RecipeStep } from "@/src/domain/recipe";

export interface RecipeStepsSectionProps {
  steps: RecipeStep[];
}

export function RecipeStepsSection({ steps }: RecipeStepsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold text-foreground-strong">Étapes de Préparation</h2>
      <ol className="flex flex-col gap-3">
        {steps.map((step) => (
          <li key={step.order}>
            <Card variant="outlined" className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground-strong text-xs font-extrabold text-white">
                {step.order}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-foreground-strong">{step.title}</p>
                  {step.durationLabel && (
                    <span className="rounded-full bg-catalog-chip px-2 py-0.5 text-xs font-semibold text-muted-foreground">{step.durationLabel}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
