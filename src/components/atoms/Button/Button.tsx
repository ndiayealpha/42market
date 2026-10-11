import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { buttonVariants, type ButtonVariant } from "./button.variants";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: ButtonVariant;
  /** Trailing icon — `soft` only ("Classé par :", "Précommander" never carry one). Always decorative. */
  icon?: ReactNode;
}

export function Button({ variant, icon, children, className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonVariants(variant, Boolean(icon), className)} {...props}>
      {children}
      {icon && <span aria-hidden>{icon}</span>}
    </button>
  );
}
