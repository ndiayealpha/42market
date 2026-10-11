import NextLink from "next/link";
import type { ComponentProps } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface TextLinkProps extends ComponentProps<typeof NextLink> {
  /** "skip" appends a trailing arrow, e.g. signup's "Passer l'étape →". */
  variant?: "default" | "muted" | "skip";
}

/** Styled text link atom, wrapping next/link so every text link looks the same. */
export function TextLink({ variant = "default", className = "", children, ...props }: TextLinkProps) {
  const variantClass =
    variant === "default"
      ? "text-foreground hover:underline"
      : "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground";

  return (
    <NextLink className={`text-sm font-medium ${variantClass} ${className}`} {...props}>
      {children}
      {variant === "skip" && <Icon name="arrow-right" size={14} decorative />}
    </NextLink>
  );
}
