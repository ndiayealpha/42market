const formatEuro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export interface PriceProps {
  amount: number;
  oldAmount?: number;
  /** e.g. "Lot" — rendered before the old amount. */
  prefix?: string;
  /** "inline": new price then struck old price, same line (stickers). "stacked": old price above, new price below, right-aligned (the bordeaux card's price block). */
  layout: "inline" | "stacked";
  /** "sm": stickers/inline use. "lg": the card's own price block. */
  size: "sm" | "lg";
  color: string;
  oldColor: string;
  className?: string;
}

/** Price (+ optional struck former price), one formatter, one accessible label for every usage. */
export function Price({ amount, oldAmount, prefix, layout, size, color, oldColor, className = "" }: PriceProps) {
  const formattedAmount = formatEuro.format(amount);
  const formattedOld = oldAmount != null ? formatEuro.format(oldAmount) : null;
  const accessibleLabel = formattedOld ? `${formattedAmount} au lieu de ${formattedOld}` : formattedAmount;
  const amountClass = size === "lg" ? "text-[26px] font-extrabold leading-none" : "text-[15px] font-extrabold leading-none";

  return (
    <span
      role="text"
      aria-label={accessibleLabel}
      className={`inline-flex ${layout === "stacked" ? "flex-col-reverse items-end gap-0.5" : "flex-row items-baseline gap-1.5"} ${className}`}
    >
      <span aria-hidden className={amountClass} style={{ color }}>
        {formattedAmount}
      </span>
      {formattedOld && (
        <span aria-hidden className="text-xs font-medium" style={{ color: oldColor }}>
          {prefix ? `${prefix} ` : ""}
          <span className="line-through">{formattedOld}</span>
        </span>
      )}
    </span>
  );
}
