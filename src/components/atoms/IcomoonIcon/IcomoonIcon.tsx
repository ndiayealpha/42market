import type { SVGAttributes } from "react";

import type { IcomoonIconName } from "./icomoon-icon-names.generated";

/** Served from `public/icomoon/symbol-defs.svg` (same-origin, so the browser's native `<use href="...#id">` resolves it with no JS/fetch logic of our own). */
const SPRITE_URL = "/icomoon/symbol-defs.svg";

export interface IcomoonIconProps extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  name: IcomoonIconName;
  size?: number;
  /**
   * Decorative icons (the default) are hidden from assistive tech, same
   * convention as the existing `Icon` atom. Set to `false` and pass
   * `aria-label` when the icon is the only content of a control (e.g. an
   * icon-only button).
   */
  decorative?: boolean;
}

/**
 * The icon component for custom, hand-picked icons exported from
 * icomoon.io — see `icomoon/README.md` for the full export/regenerate
 * workflow. Deliberately separate from the existing `src/components/atoms/
 * Icon/Icon.tsx` (the inline-SVG registry already used everywhere): this
 * is new infrastructure for *future* icons, not a replacement, and no
 * existing `<Icon>` usage is touched by introducing it.
 *
 * Renders a plain `<svg><use></svg>` referencing a `<symbol>` in the
 * shared sprite — no icon font, no extra network request beyond the one
 * sprite file (cached after first load), and `fill="currentColor"` so
 * icons recolor via CSS `color` exactly like the rest of the design
 * system's icons.
 */
export function IcomoonIcon({ name, size = 20, decorative = true, className, ...props }: IcomoonIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="currentColor"
      className={className}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      <use href={`${SPRITE_URL}#${name}`} />
    </svg>
  );
}
