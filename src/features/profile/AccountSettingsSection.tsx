import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Card } from "@/src/components/atoms/Card/Card";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { SettingsListItem } from "@/src/components/molecules/SettingsListItem/SettingsListItem";
import type { AccountSettingsSummary, SettingsRow } from "@/src/domain/account-settings";
import { formatAddressesLabel, formatPaymentMethodLabel } from "@/src/domain/account-settings";
import { routes } from "@/src/lib/routing/routes";

export interface AccountSettingsSectionProps {
  settings: AccountSettingsSummary | null;
  isLoading: boolean;
  isError: boolean;
}

function buildRows(settings: AccountSettingsSummary): SettingsRow[] {
  return [
    {
      id: "personal-info",
      icon: "user",
      title: "Informations personnelles",
      description: `${settings.email} • ${settings.phone}`,
      trailing: "chevron",
      href: routes.main.profileEdit,
    },
    {
      id: "payment",
      icon: "credit-card",
      title: "Modes de paiement",
      description: formatPaymentMethodLabel(settings.payment),
      trailing: "chevron",
      href: routes.main.paymentMethods,
    },
    {
      id: "addresses",
      icon: "location",
      title: "Adresses enregistrées",
      description: formatAddressesLabel(settings.addresses),
      trailing: "chevron",
      href: routes.main.addresses,
    },
    {
      id: "support",
      icon: "help-circle",
      title: "Support & Aide",
      description: "Centre d'assistance 42 Markets • FAQ",
      trailing: "chevron",
      href: routes.main.support,
    },
  ];
}

function AccountSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} height={56} radius="xl" />
      ))}
    </div>
  );
}

export function AccountSettingsSection({ settings, isLoading, isError }: AccountSettingsSectionProps) {
  return (
    <Section id="parametres-compte" title="Paramètres du Compte">
      <Card variant="elevated" className="mt-4 !p-2">
        <AsyncSection isLoading={isLoading} isError={isError} isEmpty={!settings} skeleton={<AccountSettingsSkeleton />}>
          {settings && (
            <ul className="flex flex-col divide-y divide-catalog-line">
              {buildRows(settings).map((row) => (
                <li key={row.id}>
                  <SettingsListItem {...row} />
                </li>
              ))}
            </ul>
          )}
        </AsyncSection>
      </Card>
    </Section>
  );
}
