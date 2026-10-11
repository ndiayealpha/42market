import type { ReactNode } from "react";

export interface AuthLayoutProps {
  /** The left panel — an `AuthHeroPanel` on both login and signup. */
  hero: ReactNode;
  /** The form column's content. */
  children: ReactNode;
  /**
   * "clamp" (login): the whole page is pinned to the viewport height and
   * never scrolls on desktop — every block below sizes itself with
   * `clamp()` against `vh` instead.
   *
   * "sticky" (signup): the page is taller than the viewport and scrolls
   * normally; the hero panel is pinned with `position: sticky` so it
   * stays visible while the form column scrolls past it.
   */
  scrollBehavior?: "clamp" | "sticky";
}

// NOTE: these two class strings must stay literal (no template-literal
// interpolation) — Tailwind's compiler statically scans source text for
// class names, so a JS-built string like `py-[${x}]` silently produces
// no CSS at all. Both spell out the same clamp(16px,4vh,60px) padding.
const PAGE_PADDING_CLASS = "lg:py-[clamp(16px,4vh,60px)]";

/**
 * The two-column shell shared by the login and signup screens: page
 * background/padding, a 466px hero column, and a form column capped at
 * 528px — extracted out of the login page so both screens compose the
 * exact same layout instead of two hand-copied versions of it.
 */
export function AuthLayout({ hero, children, scrollBehavior = "clamp" }: AuthLayoutProps) {
  const isSticky = scrollBehavior === "sticky";

  return (
    <div
      className={`flex min-h-screen flex-col items-center overflow-visible bg-background px-4 py-6 sm:px-6 lg:px-10 ${PAGE_PADDING_CLASS} ${
        isSticky ? "justify-start" : "justify-center lg:h-screen lg:h-dvh lg:overflow-hidden"
      }`}
    >
      <div
        className={`grid w-full max-w-[1030px] grid-cols-1 gap-6 lg:grid-cols-[466px_minmax(0,528px)] lg:gap-8 ${
          isSticky ? "lg:items-start" : "lg:h-full lg:min-h-0"
        }`}
      >
        <div
          className={
            isSticky
              ? "hidden lg:block lg:sticky lg:top-[clamp(16px,4vh,60px)] lg:h-[calc(100dvh_-_2*clamp(16px,4vh,60px))]"
              : "hidden lg:flex lg:h-full lg:min-h-0"
          }
        >
          {hero}
        </div>

        <div
          className={`flex flex-col justify-center gap-[clamp(12px,2.4vh,28px)] py-4 lg:py-0 ${
            isSticky ? "" : "lg:h-full lg:min-h-0 lg:justify-center lg:overflow-visible"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
