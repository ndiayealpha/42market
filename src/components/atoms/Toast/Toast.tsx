export type ToastTone = "success" | "error";

const TONE_CLASSES: Record<ToastTone, string> = {
  success: "bg-foreground text-white",
  error: "bg-danger text-white",
};

export interface ToastProps {
  message: string;
  tone: ToastTone;
}

/** One toast bubble — purely presentational, stacking/timing lives in `ToastProvider`. */
export function Toast({ message, tone }: ToastProps) {
  return (
    <div className={`rounded-xl px-4 py-3 text-sm font-medium shadow-card ${TONE_CLASSES[tone]}`}>{message}</div>
  );
}
