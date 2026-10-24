export interface StoreTagProps {
  name: string;
  className?: string;
}

/** The small white pill naming a store, overlaid bottom-left on a product image (the Favoris grid's `ProductCard`). Nothing like it existed before (Phase 0 audit). */
export function StoreTag({ name, className = "" }: StoreTagProps) {
  return (
    <span className={`inline-flex items-center rounded-full bg-surface/90 px-2 py-0.5 text-[11px] font-semibold text-foreground-strong shadow-[0_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-sm ${className}`}>
      {name}
    </span>
  );
}
