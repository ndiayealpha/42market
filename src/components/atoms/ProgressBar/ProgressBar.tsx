const TONE_CLASSES: Record<"success" | "danger", string> = {
  success: "bg-catalog-success",
  danger: "bg-catalog-danger",
};

export interface ProgressBarProps {
  /** Clamped to [0, 100]. */
  value: number;
  tone: "success" | "danger";
  "aria-valuetext"?: string;
  className?: string;
}

export function ProgressBar({ value, tone, "aria-valuetext": valueText, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={valueText}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-catalog-chip ${className}`}
    >
      <div className={`h-full rounded-full transition-[width] duration-150 ease-out motion-reduce:transition-none ${TONE_CLASSES[tone]}`} style={{ width: `${clamped}%` }} />
    </div>
  );
}
