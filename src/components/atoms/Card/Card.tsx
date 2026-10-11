import type { ComponentPropsWithoutRef } from "react";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** "elevated": white, radius-xl (16px), shadow, no border, padding 20 — store/preorder cards. "outlined": white, 1px border, radius-lg (12px), padding 12 — preorder card. */
  variant: "elevated" | "outlined";
}

const VARIANT_CLASSES: Record<CardProps["variant"], string> = {
  elevated: "rounded-2xl bg-surface p-5 shadow-card",
  outlined: "rounded-xl border border-catalog-line bg-surface p-3",
};

/** The one card shape behind every store/preorder surface — see `variant` for the two looks the mockups use. */
export function Card({ variant, className = "", ...props }: CardProps) {
  return <div className={`${VARIANT_CLASSES[variant]} ${className}`} {...props} />;
}
