import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { buttonVariants, type ButtonVariant } from "./button.variants";

export interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant: ButtonVariant;
  icon?: ReactNode;
}

export function ButtonLink({ variant, icon, children, className = "", ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonVariants(variant, Boolean(icon), className)} {...props}>
      {children}
      {icon && <span aria-hidden>{icon}</span>}
    </Link>
  );
}
