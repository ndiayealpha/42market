import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";

export interface StoreAvatarGroupStore {
  slug: string;
  name: string;
}

export interface StoreAvatarGroupProps {
  stores: StoreAvatarGroupStore[];
  size?: number;
  className?: string;
}

const MAX_VISIBLE = 2;

/**
 * Overlapping store avatars for a grouped-store card/section (e.g. "Nimba
 * Market & Elikya Market"). The first store's avatar stays fully readable
 * — painted on top via explicit z-index, since later DOM siblings would
 * otherwise paint over it by default with `-space-x-*` — and anything
 * past `MAX_VISIBLE` collapses into one "+N" chip instead of piling up
 * more overlapping circles.
 */
export function StoreAvatarGroup({ stores, size = 48, className = "" }: StoreAvatarGroupProps) {
  const visible = stores.slice(0, MAX_VISIBLE);
  const hiddenCount = stores.length - visible.length;

  return (
    <span className={`flex items-center justify-center -space-x-3 ${className}`}>
      {visible.map((store, index) => (
        <span key={store.slug} className="relative" style={{ zIndex: visible.length - index }}>
          <StoreAvatar name={store.name} slug={store.slug} size={size} className="ring-2 ring-surface" />
        </span>
      ))}
      {hiddenCount > 0 && (
        <span
          aria-hidden
          className="relative flex shrink-0 items-center justify-center rounded-xl bg-surface-subtle font-bold text-foreground-strong ring-2 ring-surface"
          style={{ width: size, height: size, fontSize: size * 0.3, zIndex: 0 }}
        >
          +{hiddenCount}
        </span>
      )}
    </span>
  );
}
