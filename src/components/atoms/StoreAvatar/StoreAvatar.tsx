import { getStoreAvatarTone, getStoreInitials, type StoreAvatarTone } from "@/src/domain/store-avatar";

const TONE_CLASSES: Record<StoreAvatarTone, string> = {
  pink: "bg-catalog-badge-pink text-foreground-strong",
  gold: "bg-catalog-badge-gold text-foreground-strong",
  cream: "bg-catalog-badge-cream text-foreground-strong",
  orange: "bg-catalog-badge-orange text-white",
  wine: "bg-catalog-badge-wine text-white",
  success: "bg-catalog-success text-white",
};

export interface StoreAvatarProps {
  name: string;
  slug: string;
  size?: number;
  className?: string;
}

/** A store's initials on a deterministically-toned tile (hash of its slug) — used wherever a store needs a compact visual identity without a photo (rail tiles, section headers). */
export function StoreAvatar({ name, slug, size = 36, className = "" }: StoreAvatarProps) {
  const tone = getStoreAvatarTone(slug);
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-bold ${TONE_CLASSES[tone]} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {getStoreInitials(name)}
    </span>
  );
}
