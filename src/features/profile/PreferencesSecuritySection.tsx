"use client";

import { Card } from "@/src/components/atoms/Card/Card";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { SettingsListItem } from "@/src/components/molecules/SettingsListItem/SettingsListItem";
import { Switch } from "@/src/components/atoms/Switch/Switch";
import type { SecuritySummary } from "@/src/domain/account-settings";
import { formatSecurityLabel } from "@/src/domain/account-settings";
import { useNotificationPreferences, useToggleNotificationPreference } from "@/src/hooks/useNotificationPreferences";
import { routes } from "@/src/lib/routing/routes";

import { PREFERENCES_SECTION_ID } from "./preferences-section-id";

export interface PreferencesSecuritySectionProps {
  userId: string;
  security: SecuritySummary | null;
  isSecurityLoading: boolean;
  isSecurityError: boolean;
}

export function PreferencesSecuritySection({ userId, security, isSecurityLoading, isSecurityError }: PreferencesSecuritySectionProps) {
  const { preferences, isLoading: isPreferencesLoading, isError: isPreferencesError } = useNotificationPreferences(userId);
  const toggleNotifications = useToggleNotificationPreference(userId);

  const isLoading = isSecurityLoading || isPreferencesLoading;
  const isError = isSecurityError || isPreferencesError;

  return (
    <Section id={PREFERENCES_SECTION_ID} title="Préférences & Sécurité">
      <Card variant="elevated" className="mt-4 !p-2">
        <AsyncSection isLoading={isLoading} isError={isError} isEmpty={!security || !preferences} skeleton={<SettingsSkeleton />}>
          {security && preferences && (
            <ul className="flex flex-col divide-y divide-catalog-line">
              <li>
                <SettingsListItem icon="bell" title="Notifications" description="SMS dès que la commande est prête" trailing="switch">
                  <Switch
                    checked={preferences.smsOnOrderReady}
                    onChange={(checked) => toggleNotifications.mutate({ ...preferences, smsOnOrderReady: checked })}
                    disabled={toggleNotifications.isPending}
                    aria-label="Activer les notifications SMS dès que la commande est prête"
                  />
                </SettingsListItem>
              </li>
              <li>
                <SettingsListItem
                  icon="shield"
                  title="Sécurité du compte"
                  description={formatSecurityLabel(security)}
                  trailing="action"
                  actionLabel="Gérer"
                  href={routes.main.security}
                />
              </li>
            </ul>
          )}
        </AsyncSection>
      </Card>
    </Section>
  );
}

function SettingsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton height={56} radius="xl" />
      <Skeleton height={56} radius="xl" />
    </div>
  );
}
