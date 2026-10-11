interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
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
export function Avatar({ src, name, size = 36 }: AvatarProps) {
  if (src) {
    return (
      // next/image requires known remote hosts up front; avatar sources
      // come from arbitrary user-provided URLs, so a plain <img> is used.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      className="inline-flex items-center justify-center rounded-full bg-muted-foreground/20 text-xs font-semibold text-foreground"
      style={{ width: size, height: size }}
    >
      {getInitials(name)}
    </span>
  );
}
