import type { ReactNode } from "react";

export interface EyebrowProps {
  /** "accent": success-colored ("MOINS DE 10 KM DE VOUS"). "default": plain ink ("CATALOGUE COMPLET"). */
  tone?: "accent" | "default";
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ tone = "default", children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[13px] leading-4 font-bold uppercase ${
        tone === "accent" ? "text-catalog-success" : "text-foreground-strong"
      } ${className}`}
    >
      {children}
    </span>
  );
}
