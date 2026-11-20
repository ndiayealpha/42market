import { routes } from "@/src/lib/routing/routes";

import { DEFAULT_HEADER_ACTIONS, DEFAULT_LOCATION, DEFAULT_NAVIGATION_ITEMS } from "./Header.constants";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderTop } from "./HeaderTop";
import type { HeaderActionConfig, HeaderLocation, HeaderUser, NavigationItemConfig } from "./Header.types";

export interface HeaderProps {
  /** Omit to render the logged-out state (no avatar/tier/chevron). */
  user?: HeaderUser;
  location?: HeaderLocation;
  navigationItems?: NavigationItemConfig[];
  actions?: HeaderActionConfig[];
  registrationHref?: string;
  onSearch?: (query: string) => void;
  onLocationClick: () => void;
}

/**
 * Public marketplace header. Two rows (HeaderTop / HeaderNavigation), each
 * built from small, independently storyable atoms/molecules — nothing
 * here hardcodes copy, counts or links; all of that is config or props.
 *
 * Sticky on every breakpoint (A3) — both rows together, so the Cabas
 * stays reachable while scrolling on desktop too. `sticky` (not `fixed`)
 * keeps its height in the normal flow, so nothing else needs a
 * compensating top padding.
 */
export function Header({
  user,
  location = DEFAULT_LOCATION,
  navigationItems = DEFAULT_NAVIGATION_ITEMS,
  actions = DEFAULT_HEADER_ACTIONS,
  registrationHref = routes.main.merchantOnboarding,
  onSearch,
  onLocationClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="hidden md:block">
        <HeaderTop location={location} actions={actions} user={user} onSearch={onSearch} onLocationClick={onLocationClick} />
        <HeaderNavigation items={navigationItems} registrationHref={registrationHref} />
      </div>
      <div className="md:hidden">
        <HeaderMobile location={location} user={user} onLocationClick={onLocationClick} />
      </div>
    </header>
  );
}
