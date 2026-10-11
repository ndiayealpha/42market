import type { ReactNode } from "react";

// Static class strings, never `grid-cols-${n}` — Tailwind can't see a
// dynamically-built class name and would silently emit no CSS for it.
const COLUMN_CLASSES: Record<3 | 4, string> = {
  3: "grid grid-cols-1 gap-x-6 gap-y-[34px] sm:grid-cols-2 xl:grid-cols-3",
  4: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4",
};

export interface CardGridProps {
  columns: 3 | 4;
  children: ReactNode;
  className?: string;
}

/** `<ul role="list">` — callers wrap each item in its own `<li>`. */
export function CardGrid({ columns, children, className = "" }: CardGridProps) {
  return (
    <ul role="list" className={`${COLUMN_CLASSES[columns]} ${className}`}>
      {children}
    </ul>
  );
}
