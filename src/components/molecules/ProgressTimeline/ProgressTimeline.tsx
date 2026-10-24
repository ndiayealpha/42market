import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";

export type ProgressTimelineStepStatus = "done" | "current" | "upcoming";

export interface ProgressTimelineStep {
  id: string;
  title: string;
  description: string;
  timeLabel?: string;
  status: ProgressTimelineStepStatus;
}

export interface ProgressTimelineProps {
  steps: ProgressTimelineStep[];
  className?: string;
}

function StepDot({ status }: { status: ProgressTimelineStepStatus }) {
  if (status === "done") {
    return (
      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-white">
        <Icon name="check-circle" size={16} decorative />
      </span>
    );
  }
  if (status === "current") {
    return (
      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-catalog-badge-cream text-foreground-strong">
        <Icon name="refresh" size={16} decorative />
      </span>
    );
  }
  return <span aria-hidden className="h-8 w-8 shrink-0 rounded-full bg-catalog-chip" />;
}

/**
 * Generic vertical step tracker — S4's "Suivi de préparation en direct" is
 * one instance of it (rule: "ProgressTimeline générique, S4 en est une
 * instance"), not a one-off. Nothing like it existed before (Phase 0
 * audit).
 */
export function ProgressTimeline({ steps, className = "" }: ProgressTimelineProps) {
  return (
    <ol className={`flex flex-col ${className}`}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} aria-current={step.status === "current" ? "step" : undefined} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span aria-hidden className={`absolute top-8 bottom-0 left-4 w-px -translate-x-1/2 ${step.status === "done" ? "bg-success" : "bg-catalog-line"}`} />
            )}
            <StepDot status={step.status} />
            <div className={`min-w-0 flex-1 ${step.status === "current" ? "-mt-1 rounded-lg bg-catalog-chip p-3" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={`text-sm font-bold ${step.status === "upcoming" ? "text-muted-foreground" : "text-foreground-strong"}`}>{step.title}</p>
                {step.status === "current" && (
                  <Chip tone="dark" size="xs">
                    Actuel
                  </Chip>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
              {step.timeLabel && <time className="mt-1 block text-xs font-semibold text-foreground-strong">{step.timeLabel}</time>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
