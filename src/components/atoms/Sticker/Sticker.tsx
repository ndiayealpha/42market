import { Price, type PriceProps } from "@/src/components/atoms/Price/Price";

export type StickerAnchor = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface StickerProps {
  shape: "pill" | "circle";
  /** Typically `var(--color-promo-red)` or `var(--color-promo-orange)`. */
  bg: string;
  anchor: StickerAnchor;
  /** Degrees, e.g. 6 or -8. */
  rotate?: number;
  /** Price variant — renders a small inline `Price` (white). */
  price?: Pick<PriceProps, "amount" | "oldAmount" | "prefix">;
  /** Value/caption variant — e.g. "-30%" / "REMISE". */
  value?: string;
  caption?: string;
  className?: string;
}

const ANCHOR_CLASSES: Record<StickerAnchor, string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

/**
 * A promo callout pinned to a corner of a card's media, free to overflow
 * it. `shape="pill"` carries a price (reuses `Price`); `shape="circle"`
 * carries a short value + caption (e.g. a percentage off).
 *
 * Accessibility note: at the sizes/weights actually used here, white
 * text on `--promo-orange` measures ~2.2:1 and on `--promo-red` ~3.5–3.9:1
 * — both fail WCAG AA (needs 4.5:1, or 3:1 for ≥18.66px bold). See the
 * PromoCard delivery notes for a corrected-token suggestion; the colors
 * below are left as specified, not changed unilaterally.
 */
export function Sticker({ shape, bg, anchor, rotate = 0, price, value, caption, className = "" }: StickerProps) {
  const isCircle = shape === "circle";

  return (
    <div
      className={`absolute z-10 flex items-center justify-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.18)] ${
        isCircle ? "h-16 w-16 rounded-full border-[3px] border-white" : "rounded-full border-2 border-white px-3 py-1.5"
      } ${ANCHOR_CLASSES[anchor]} ${className}`}
      style={{ backgroundColor: bg, transform: `rotate(${rotate}deg)` }}
    >
      {price ? (
        <Price {...price} layout="inline" size="sm" color="#FFFFFF" oldColor="rgba(255,255,255,0.8)" />
      ) : (
        <span className="flex flex-col items-center justify-center text-center leading-none">
          <span className="text-base font-extrabold">{value}</span>
          {caption && <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide">{caption}</span>}
        </span>
      )}
    </div>
  );
}
