export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** Hairline rule, `line` colored by default — pass `className` (with `!`) to use a different token, e.g. PickupBar's `line-strong` separator. */
export function Divider({ orientation = "horizontal", className = "" }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`shrink-0 bg-catalog-line ${orientation === "horizontal" ? "h-px w-full" : "h-3 w-px"} ${className}`}
    />
  );
}
