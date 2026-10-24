"use client";

import type { SessionUser } from "@/src/features/auth";
import { ProfileTemplate } from "@/src/features/profile/ProfileTemplate";
import { useAccountSettings } from "@/src/hooks/useAccountSettings";
import { useActiveOrder } from "@/src/hooks/useActiveOrder";
import { useOrderHistory } from "@/src/hooks/useOrderHistory";
import { useProfile } from "@/src/hooks/useProfile";
import { useProfileStats } from "@/src/hooks/useProfileStats";
import { useTerroirs } from "@/src/hooks/useTerroirs";

export interface ProfileViewProps {
  user: SessionUser;
}

/** Thin container: wires every hook, resolves the view model, and hands it to the pure `ProfileTemplate` (same split as `StorePageView`). */
export function ProfileView({ user }: ProfileViewProps) {
  const profileQuery = useProfile(user.id);
  const statsQuery = useProfileStats(user.id);
  const terroirsQuery = useTerroirs(user.id);
  const activeOrderQuery = useActiveOrder(user.id);
  const orderHistoryQuery = useOrderHistory(user.id);
  const settingsQuery = useAccountSettings(user.id);

  return (
    <ProfileTemplate
      userId={user.id}
      userName={user.name}
      profile={profileQuery.profile}
      isProfileLoading={profileQuery.isLoading}
      stats={statsQuery.stats}
      terroirs={terroirsQuery.terroirs}
      terroirSuggestionLabel={terroirsQuery.suggestionLabel}
      isTerroirsLoading={terroirsQuery.isLoading}
      isTerroirsError={terroirsQuery.isError}
      activeOrder={activeOrderQuery.order}
      isActiveOrderLoading={activeOrderQuery.isLoading}
      isActiveOrderError={activeOrderQuery.isError}
      orderHistory={orderHistoryQuery.entries}
      orderHistoryTotalCount={orderHistoryQuery.totalCount}
      isOrderHistoryLoading={orderHistoryQuery.isLoading}
      isOrderHistoryError={orderHistoryQuery.isError}
      settings={settingsQuery.settings}
      isSettingsLoading={settingsQuery.isLoading}
      isSettingsError={settingsQuery.isError}
    />
  );
}
