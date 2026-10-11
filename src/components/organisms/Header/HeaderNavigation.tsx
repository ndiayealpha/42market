import { Divider } from "@/src/components/atoms/Divider/Divider";

import { NavigationItem } from "./NavigationItem";
import { StoreRegistrationButton } from "./StoreRegistrationButton";
import type { NavigationItemConfig } from "./Header.types";

export interface HeaderNavigationProps {
  items: NavigationItemConfig[];
  registrationHref: string;
}

/** The header's second row: primary nav + the merchant sign-up CTA. */
export function HeaderNavigation({ items, registrationHref }: HeaderNavigationProps) {
  return (
    <nav
      aria-label="Navigation principale"
      className="flex items-center gap-6 overflow-x-auto border-t border-border px-4 py-3 sm:px-6"
    >
      {items.map((item) => (
        <NavigationItem key={item.href} item={item} />
      ))}
      <Divider orientation="vertical" />
      <StoreRegistrationButton href={registrationHref} />
    </nav>
  );
}
