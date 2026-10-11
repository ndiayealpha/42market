/**
 * Simplified country flags as plain SVG shapes — never emoji (flag emoji
 * don't render on Windows, per the recipe section's brief). Add a
 * country by adding a `FlagCode` + a `FLAG_SHAPES` entry, same pattern
 * as the `Icon` registry.
 */
export type FlagCode = "sn" | "ml" | "ng" | "gh" | "ci";

const FLAG_SHAPES: Record<FlagCode, React.ReactNode> = {
  sn: (
    <>
      <rect width="1" height="2" fill="#00853F" />
      <rect x="1" width="1" height="2" fill="#FDEF42" />
      <rect x="2" width="1" height="2" fill="#E31B23" />
      <path d="M1.5 0.75l0.12 0.28 0.3 0 -0.24 0.18 0.09 0.29 -0.27-0.19-0.27 0.19 0.09-0.29-0.24-0.18 0.3 0z" fill="#00853F" />
    </>
  ),
  ml: (
    <>
      <rect width="1" height="2" fill="#14B53A" />
      <rect x="1" width="1" height="2" fill="#FCD116" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </>
  ),
  ng: (
    <>
      <rect width="1" height="2" fill="#008751" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#008751" />
    </>
  ),
  gh: (
    <>
      <rect width="3" height="0.667" fill="#CE1126" />
      <rect y="0.667" width="3" height="0.667" fill="#FCD116" />
      <rect y="1.333" width="3" height="0.667" fill="#006B3F" />
      <path d="M1.5 0.8l0.1 0.24 0.26 0 -0.21 0.16 0.08 0.25 -0.23-0.17-0.23 0.17 0.08-0.25-0.21-0.16 0.26 0z" fill="#000000" />
    </>
  ),
  ci: (
    <>
      <rect width="1" height="2" fill="#F77F00" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#009E60" />
    </>
  ),
};

export interface FlagProps {
  code: FlagCode;
  /** Width in px — height follows the flag's 3:2 ratio. */
  size?: number;
  className?: string;
}

export function Flag({ code, size = 12, className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 3 2"
      width={size}
      height={(size * 2) / 3}
      aria-hidden
      className={`shrink-0 rounded-[1px] ${className}`}
    >
      {FLAG_SHAPES[code]}
    </svg>
  );
}
