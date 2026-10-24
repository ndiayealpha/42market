import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton, type IconButtonProps } from "@/src/components/atoms/IconButton/IconButton";

export interface AddToCartButtonProps {
  productName: string;
  onAdd: () => void;
  unavailable?: boolean;
  /** "round" (default, every pre-existing usage): the "+" icon button. "block": full-width "+ Ajouter" (R4's search result cards). "cta": full-width "Ajouter au cabas • {ctaLabel}" (P7's purchase box). */
  variant?: "round" | "block" | "cta";
  /** "cta" only — the trailing "• {total}" text (P7 computes it; this button never does). */
  ctaLabel?: string;
  isPending?: boolean;
  size?: IconButtonProps["size"];
  bg?: string;
  fg?: string;
  className?: string;
}

/**
 * One "add to cart" control, 3 shapes. The round "+" (every pre-existing
 * card) is unchanged; "block"/"cta" are additive for the new Pages P/R.
 * Unavailable → disabled + "Indisponible"/"×", `onAdd` never invoked
 * (rule: natively `disabled`, same semantics everywhere).
 */
export function AddToCartButton({
  productName,
  onAdd,
  unavailable,
  variant = "round",
  ctaLabel,
  isPending,
  size = "md",
  bg = "var(--color-foreground-strong)",
  fg = "#FFFFFF",
  className = "",
}: AddToCartButtonProps) {
  if (variant === "round") {
    return (
      <IconButton
        icon={unavailable ? "close" : "plus"}
        size={size}
        bg={bg}
        fg={fg}
        ariaLabel={`Ajouter ${productName} au panier`}
        onClick={unavailable ? undefined : onAdd}
        disabled={unavailable}
        className={className}
      />
    );
  }

  if (variant === "block") {
    return (
      <button
        type="button"
        onClick={unavailable ? undefined : onAdd}
        disabled={unavailable}
        aria-busy={isPending}
        style={{ backgroundColor: bg, color: fg }}
        className={`flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold disabled:opacity-40 ${className}`}
      >
        <Icon name={unavailable ? "close" : "plus"} size={14} decorative />
        {unavailable ? "Indisponible" : "Ajouter"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={unavailable ? undefined : onAdd}
      disabled={unavailable}
      aria-busy={isPending}
      aria-label={
        unavailable
          ? `${productName} indisponible`
          : // Visible text ("Ajouter au cabas") kept as a literal prefix so the accessible name contains the visible label (WCAG 2.5.3 Label in Name) — the product name/total are appended context, not a replacement for it.
            `Ajouter au cabas : ${productName}${ctaLabel ? ` • ${ctaLabel}` : ""}`
      }
      style={{ backgroundColor: bg, color: fg }}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-bold disabled:opacity-40 ${className}`}
    >
      {unavailable ? (
        "Indisponible"
      ) : (
        <>
          Ajouter au cabas {ctaLabel && `• ${ctaLabel}`}
          <Icon name="basket" size={18} decorative />
        </>
      )}
    </button>
  );
}
