"use client";

import { Card } from "@/src/components/atoms/Card/Card";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { SettingsListItem } from "@/src/components/molecules/SettingsListItem/SettingsListItem";
import { Switch } from "@/src/components/atoms/Switch/Switch";
import { PREFERENCES_SECTION_ID } from "@/src/features/profile/preferences-section-id";
import { useNotificationPreferences, useToggleNotificationPreference } from "@/src/hooks/useNotificationPreferences";
import { useWebPushPermission } from "@/src/hooks/useWebPushPermission";
import { routes } from "@/src/lib/routing/routes";

export interface AlertSettingsCardProps {
  userId: string;
  isPhoneVerified: boolean;
}

/** N6 — "Alertes SMS Retrait" is the exact same preference/mutation as the Profile's "Notifications" switch (rule 7): toggling either one updates both. */
export function AlertSettingsCard({ userId, isPhoneVerified }: AlertSettingsCardProps) {
  const { preferences } = useNotificationPreferences(userId);
  const toggle = useToggleNotificationPreference(userId);
  const { permission, requestPermission } = useWebPushPermission();

  if (!preferences) return null;

  // Captured once narrowed — a nested closure can't keep TS's `!preferences` narrowing otherwise.
  const currentPreferences = preferences;
  const webPushDenied = permission === "denied";

  async function handleWebPushChange(checked: boolean) {
    if (checked && permission !== "granted") {
      const result = await requestPermission();
      if (result !== "granted") return;
    }
    toggle.mutate({ ...currentPreferences, webPushEnabled: checked });
  }

  return (
    <Card variant="elevated" className="flex flex-col gap-1 !p-2">
      <div className="flex items-center justify-between gap-2 px-3 pt-2">
        <p className="text-sm font-bold text-foreground-strong">Réglages des alertes</p>
        <Icon name="sliders" size={16} className="text-muted-foreground" decorative />
      </div>

      <ul role="list" className="flex flex-col divide-y divide-catalog-line">
        <li>
          <SettingsListItem
            title="Notifications Web"
            description={webPushDenied ? "Autorisation refusée — activez-la dans les réglages du navigateur." : "Alertes immédiates dans le navigateur"}
            trailing="switch"
          >
            <Switch
              checked={currentPreferences.webPushEnabled && !webPushDenied}
              onChange={handleWebPushChange}
              disabled={webPushDenied || toggle.isPending}
              aria-label="Activer les notifications web"
            />
          </SettingsListItem>
        </li>
        <li>
          <SettingsListItem
            title="Alertes SMS Retrait"
            description={isPhoneVerified ? "Quand la commande est au comptoir" : "Numéro non vérifié — voir Informations personnelles"}
            trailing="switch"
          >
            <Switch
              checked={currentPreferences.smsOnOrderReady}
              onChange={(checked) => toggle.mutate({ ...currentPreferences, smsOnOrderReady: checked })}
              disabled={!isPhoneVerified || toggle.isPending}
              aria-label="Activer les alertes SMS de retrait"
            />
          </SettingsListItem>
        </li>
        <li>
          <SettingsListItem title="Gazette des terroirs" description="Résumé hebdo des recettes et arrivages" trailing="switch">
            <Switch
              checked={currentPreferences.terroirNewsletter}
              onChange={(checked) => toggle.mutate({ ...currentPreferences, terroirNewsletter: checked })}
              disabled={toggle.isPending}
              aria-label="S'abonner à la gazette des terroirs"
            />
          </SettingsListItem>
        </li>
      </ul>

      <ButtonLink href={`${routes.main.profile}#${PREFERENCES_SECTION_ID}`} variant="soft" className="mx-1 mb-1 justify-center">
        Gérer toutes mes préférences
      </ButtonLink>
    </Card>
  );
}
