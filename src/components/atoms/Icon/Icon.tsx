import type { SVGAttributes } from "react";

/**
 * Every glyph the design system needs, in one place. A single generic
 * `Icon` atom (rather than one component per glyph) keeps each icon a
 * one-line registry entry instead of a whole file, and gives every
 * consumer the same props/behavior (size, decorative vs. labelled).
 */
export type IconName =
  | "search"
  | "location"
  | "chevron-down"
  | "chevron-right"
  | "heart"
  | "bell"
  | "basket"
  | "store"
  | "clock"
  | "shield"
  | "mail"
  | "lock"
  | "eye"
  | "eye-off"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin"
  | "google"
  | "apple"
  | "arrow-right"
  | "log-in"
  | "user-plus"
  | "sparkle"
  | "home"
  | "user"
  | "youtube"
  | "cooking"
  | "chevron-left"
  | "zap"
  | "glass"
  | "leaf"
  | "swipe"
  | "timer"
  | "close"
  | "gps"
  | "star"
  | "archive"
  | "calendar";

const PATHS: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  location: (
    <>
      <path
        d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </>
  ),
  "chevron-down": (
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "chevron-right": (
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  heart: (
    <path
      d="M20.8 8.6c0-2.6-2.1-4.6-4.7-4.6-1.7 0-3.2.9-4.1 2.3C11.1 4.9 9.6 4 7.9 4 5.3 4 3.2 6 3.2 8.6c0 5.4 8.8 10.4 8.8 10.4s8.8-5 8.8-10.4z"
      fill="currentColor"
    />
  ),
  bell: (
    <>
      <path
        d="M18 16v-5a6 6 0 1 0-12 0v5l-1.5 2h15L18 16z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  basket: (
    <>
      <path
        d="M4 8h16l-1.5 10.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 8z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </>
  ),
  store: (
    <>
      <path d="M4 9l1-4h14l1 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M4 9v10h16V9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M9 19v-5h6v5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  shield: (
    <>
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  eye: (
    <>
      <path
        d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </>
  ),
  "eye-off": (
    <>
      <path
        d="M4 4l16 16M9.9 5.6C10.6 5.5 11.3 5.5 12 5.5c6.5 0 10 6.5 10 6.5a15.6 15.6 0 0 1-3.4 4.3M6.6 7.2A15.7 15.7 0 0 0 2 12s3.5 6.5 10 6.5c1.1 0 2.1-.2 3.1-.5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1 14.1a3 3 0 1 1-4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  google: (
    <>
      <path
        d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"
        fill="#34A853"
      />
      <path
        d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2a10 10 0 0 0-8.9 5.4l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9z"
        fill="#EA4335"
      />
    </>
  ),
  apple: (
    <path
      d="M16.4 2c.1 1.1-.3 2.2-1 3-.7.8-1.8 1.4-2.9 1.3-.1-1.1.4-2.2 1.1-2.9.7-.8 1.9-1.3 2.8-1.4zM19.9 17.5c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.6-.9-1.9 0-2.3.9-3.6.9-1.6 0-2.8-1.5-3.7-2.9C1.5 17.4.8 12.9 2.6 9.9c1-1.7 2.8-2.7 4.5-2.7 1.5 0 2.5 1 3.7 1 1.2 0 2-.9 3.7-1 1.3-.1 2.9.7 3.8 2-3.3 1.8-2.8 6.6 1.6 8.3z"
      fill="#000000"
    />
  ),
  "arrow-right": (
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "log-in": (
    <>
      <path
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17l5-5-5-5M15 12H3"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  "user-plus": (
    <>
      <circle cx="9" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M19 8v6M16 11h6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  sparkle: (
    <path
      d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"
      fill="currentColor"
    />
  ),
  home: (
    <>
      <path
        d="M4 11l8-7 8 7"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9.5V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 21v-6h4v6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path
        d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" />
    </>
  ),
  cooking: (
    <>
      <circle cx="11" cy="14" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M18 11h3.5a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1H18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M7 14a4 4 0 0 1 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  "chevron-left": (
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  zap: (
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  ),
  glass: (
    <>
      <path d="M6 3h12l-1.5 12a4.5 4.5 0 0 1-9 0L6 3z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M9 21h6M12 15.5V21" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  leaf: (
    <path
      d="M5 19c9 0 14-5 14-14V4h-1C9 4 5 9 5 18v1z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  swipe: (
    <>
      <path
        d="M5 12c0-3.5 2-5 4-5s3 1.5 3 3v4"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 11c.3-.8 1-1.3 1.8-1.3 1 0 1.7.8 1.7 1.8v2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M9 19.5c-1.8-.6-3-2-3.4-3.8L5 13.5c-.2-.9.2-1.6 1-1.8.6-.1 1.1.1 1.5.6l1 1.4V16l7-.3c1.4 0 2.5 1 2.5 2.4v1.4H9z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M18 6l2.5 2.5L18 11" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 8.5l2.5-2.5L2 3.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M13 22v-9h3l.5-4H13V6.5c0-1.2.3-2 2-2h1.8V1.1C16.4 1 15.2 1 13.8 1 10.9 1 9 2.7 9 6v3H6v4h3v9h4z"
      fill="currentColor"
    />
  ),
  tiktok: (
    <path
      d="M14 3c.3 2 1.8 3.6 3.8 4v3c-1.4 0-2.7-.4-3.8-1.1v6.6a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.4 2.4 0 1 0 2 2.4V3h2.6z"
      fill="currentColor"
    />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="7.5" cy="8" r="1.3" fill="currentColor" />
      <path d="M7.5 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M11.5 17v-3.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5V17"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M11.5 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  timer: (
    <>
      <path d="M9 2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="14" r="8" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M12 10.5v3.8l2.6 1.6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  gps: (
    <>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  star: <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5-5.9-3.3-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7 2.9-6z" fill="currentColor" />,
  archive: (
    <>
      <rect x="3" y="4" width="18" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M4.5 8.5V18a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V8.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M10 12.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M3 9.5h18M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </>
  ),
};

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  /**
   * Decorative icons (the default) are hidden from assistive tech. Set to
   * false and pass `aria-label` when the icon is the only content of a
   * control (e.g. an icon-only button).
   */
  decorative?: boolean;
}

export function Icon({ name, size = 20, decorative = true, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
