import type { ReactNode } from "react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  /** Adds a colored ring around the avatar — the profile hero card's larger portrait. */
  ring?: boolean;
  /** Bottom-right overlay (e.g. a VIP star pastille) — absent by default, every existing caller is unaffected. */
  badge?: ReactNode;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Circular avatar: shows the image when provided, otherwise initials. */
export function Avatar({ src, name, size = 36, ring = false, badge }: AvatarProps) {
  const ringClass = ring ? "ring-4 ring-store-accent-gold/60" : "";

  const image = src ? (
    // next/image requires known remote hosts up front; avatar sources
    // come from arbitrary user-provided URLs, so a plain <img> is used.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`rounded-full object-cover ${ringClass}`}
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      role="img"
      aria-label={name}
      className={`inline-flex items-center justify-center rounded-full bg-muted-foreground/20 text-xs font-semibold text-foreground ${ringClass}`}
      style={{ width: size, height: size }}
    >
      {getInitials(name)}
    </span>
  );

  if (!badge) return image;

  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      {image}
      <span className="absolute bottom-0 right-0 flex h-[38%] w-[38%] items-center justify-center rounded-full bg-store-accent-gold ring-2 ring-surface">
        {badge}
      </span>
    </span>
  );
}
