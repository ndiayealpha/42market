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
  onLocationClick?: () => void;
  onSearch?: (query: string) => void;
}

/**
 * Public marketplace header. Two rows (HeaderTop / HeaderNavigation), each
 * built from small, independently storyable atoms/molecules — nothing
 * here hardcodes copy, counts or links; all of that is config or props.
 */
export function Header({
  user,
  location = DEFAULT_LOCATION,
  navigationItems = DEFAULT_NAVIGATION_ITEMS,
  actions = DEFAULT_HEADER_ACTIONS,
  registrationHref = routes.auth.createAccount,
  onLocationClick,
  onSearch,
}: HeaderProps) {
  return (
    // Sticky only takes effect below `md` (mobile) — `md:static` restores
    // today's desktop behavior (not sticky) exactly, so nothing changes
    // there.
    <header className="sticky top-0 z-40 border-b border-border bg-surface md:static md:z-auto">
      <div className="hidden md:block">
        <HeaderTop
          location={location}
          actions={actions}
          user={user}
          onLocationClick={onLocationClick}
          onSearch={onSearch}
        />
        <HeaderNavigation items={navigationItems} registrationHref={registrationHref} />
      </div>
      <div className="md:hidden">
        <HeaderMobile location={location} user={user} onLocationClick={onLocationClick} />
      </div>
    </header>
  );
}
