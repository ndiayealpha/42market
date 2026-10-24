import type { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * The page's own max-width gutter (`mx-auto max-w-[1280px] px-4
 * sm:px-6 xl:px-0`). The dashboard page currently repeats this inline —
 * left untouched (rule 1); new pages can adopt this instead.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto max-w-[1280px] px-4 sm:px-6 xl:px-0 ${className}`}>{children}</div>;
}
