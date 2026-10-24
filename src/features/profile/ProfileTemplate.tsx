import type { ProfileDetails, ProfileStats } from "@/src/domain/profile";
import type { ActiveOrder, OrderHistoryEntry } from "@/src/domain/orders";
import type { AccountSettingsSummary } from "@/src/domain/account-settings";
import type { Terroir } from "@/src/domain/terroir";
import { Container } from "@/src/components/layout/Container/Container";
import { routes } from "@/src/lib/routing/routes";

import { AccountSettingsSection } from "./AccountSettingsSection";
import { ActiveOrderSection } from "./ActiveOrderSection";
import { JoinNetworkBanner } from "./JoinNetworkBanner";
import { OrderHistorySection } from "./OrderHistorySection";
import { PREFERENCES_SECTION_ID } from "./preferences-section-id";
import { PreferencesSecuritySection } from "./PreferencesSecuritySection";
import { ProfileHeroCard } from "./ProfileHeroCard";
import { ProfilePageHeader } from "./ProfilePageHeader";
import { SignOutFooter } from "./SignOutFooter";
import { TerroirsSection } from "./TerroirsSection";

export interface ProfileTemplateProps {
  userId: string;
  userName: string;
  profile: ProfileDetails | null;
  isProfileLoading: boolean;
  stats: ProfileStats | null;
  terroirs: Terroir[];
  terroirSuggestionLabel: string;
  isTerroirsLoading: boolean;
  isTerroirsError: boolean;
  activeOrder: ActiveOrder | null;
  isActiveOrderLoading: boolean;
  isActiveOrderError: boolean;
  orderHistory: OrderHistoryEntry[];
  orderHistoryTotalCount: number;
  isOrderHistoryLoading: boolean;
  isOrderHistoryError: boolean;
  settings: AccountSettingsSummary | null;
  isSettingsLoading: boolean;
  isSettingsError: boolean;
}

/**
 * Pure presentational template — no data fetching, no hooks of its own
 * (`PreferencesSecuritySection`/`SignOutFooter` are the only "use client"
 * leaves, per rule 10). This is the component Storybook's page-level
 * scenarios (Default/SansCommandeEnCours/.../Mobile) target; the
 * hook-wiring container (`ProfileView`) is not rendered in Storybook —
 * same split as `StorePageView` vs. its sections.
 */
export function ProfileTemplate({
  userId,
  userName,
  profile,
  isProfileLoading,
  stats,
  terroirs,
  terroirSuggestionLabel,
  isTerroirsLoading,
  isTerroirsError,
  activeOrder,
  isActiveOrderLoading,
  isActiveOrderError,
  orderHistory,
  orderHistoryTotalCount,
  isOrderHistoryLoading,
  isOrderHistoryError,
  settings,
  isSettingsLoading,
  isSettingsError,
}: ProfileTemplateProps) {
  return (
    <Container className="flex flex-col gap-8 py-6">
      <ProfilePageHeader isVerified={profile?.isVerified ?? false} preferencesAnchor={`#${PREFERENCES_SECTION_ID}`} />

      {!isProfileLoading && profile && stats && <ProfileHeroCard name={userName} profile={profile} stats={stats} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <TerroirsSection
            terroirs={terroirs}
            suggestionLabel={terroirSuggestionLabel}
            isLoading={isTerroirsLoading}
            isError={isTerroirsError}
            editHref={routes.main.profileEdit}
          />

          <ActiveOrderSection order={activeOrder} isLoading={isActiveOrderLoading} isError={isActiveOrderError} />

          <OrderHistorySection
            entries={orderHistory}
            totalCount={orderHistoryTotalCount}
            isLoading={isOrderHistoryLoading}
            isError={isOrderHistoryError}
          />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <AccountSettingsSection settings={settings} isLoading={isSettingsLoading} isError={isSettingsError} />

          <PreferencesSecuritySection
            userId={userId}
            security={settings?.security ?? null}
            isSecurityLoading={isSettingsLoading}
            isSecurityError={isSettingsError}
          />

          <JoinNetworkBanner />

          <SignOutFooter userId={userId} />
        </div>
      </div>
    </Container>
  );
}
