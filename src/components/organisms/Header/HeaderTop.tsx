import { Divider } from "@/src/components/atoms/Divider/Divider";
import { Logo } from "@/src/components/atoms/Logo/Logo";
import { HeaderAction } from "@/src/components/molecules/HeaderAction/HeaderAction";
import { HeaderSearch } from "@/src/components/molecules/HeaderSearch/HeaderSearch";
import { UserMenu } from "@/src/components/molecules/UserMenu/UserMenu";

import type { HeaderActionConfig, HeaderLocation, HeaderUser } from "./Header.types";

export interface HeaderTopProps {
  location: HeaderLocation;
  actions: HeaderActionConfig[];
  user?: HeaderUser;
  onSearch?: (query: string) => void;
  onLocationClick: () => void;
}

/** The header's first row: brand, search, actions and the user menu. */
export function HeaderTop({ location, actions, user, onSearch, onLocationClick }: HeaderTopProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
      <Logo />

      <div className="order-3 w-full sm:order-none sm:flex-1">
        <HeaderSearch location={location.location} radiusLabel={location.radiusLabel} onSearch={onSearch} onLocationClick={onLocationClick} />
      </div>

      <div className="flex items-center justify-end gap-5">
        {actions.map((action) => (
          <HeaderAction
            key={action.key}
            icon={action.icon}
            label={action.label}
            href={action.href}
            count={action.count}
            badgeColor={action.badgeColor}
            isActive={action.isActive}
          />
        ))}

        {user && (
          <>
            <Divider orientation="vertical" />
            <UserMenu name={user.name} tier={user.tier} avatarSrc={user.avatarSrc} />
          </>
        )}
      </div>
    </div>
  );
}
