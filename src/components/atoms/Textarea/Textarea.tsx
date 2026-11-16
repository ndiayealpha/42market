import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visual style: "plain" has no border/background, same convention as `Input`. */
  variant?: "bordered" | "plain";
}

/**
 * Multi-line text atom — no `Textarea` primitive existed in this repo
 * (checked first, same precedent as `ProductInfoAccordions`'s accordion
 * note); mirrors `Input`'s bordered/plain variant and ref-forwarding so it
 * works as a direct target of React Hook Form's `register()`.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant = "bordered", className = "", rows = 4, ...props },
  ref
) {
  const base = "w-full resize-y bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none";
  const variantClassName =
    variant === "bordered" ? "rounded-lg border border-border bg-surface px-3 py-2 focus-within:ring-2 focus-within:ring-info" : "";

  return <textarea ref={ref} rows={rows} className={`${base} ${variantClassName} ${className}`} {...props} />;
});
