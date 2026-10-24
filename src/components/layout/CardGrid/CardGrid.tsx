import type { ReactNode } from "react";

// Static class strings, never `grid-cols-${n}` — Tailwind can't see a
// dynamically-built class name and would silently emit no CSS for it.
const COLUMN_CLASSES: Record<3 | 4 | 5 | 6, string> = {
  3: "grid grid-cols-1 gap-x-6 gap-y-[34px] sm:grid-cols-2 xl:grid-cols-3",
  4: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4",
  // Favorites product grid: 5 → 4 → 3 → 2, per the Favoris page spec.
  5: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  // Page A's product grid: 6 → 4 → 3 → 2, per rule 10.
  6: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

export interface CardGridProps {
  columns: 3 | 4 | 5 | 6;
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
