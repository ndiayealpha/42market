"use client";

import { Button } from "@/src/components/atoms/Button/Button";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { SegmentedControl } from "@/src/components/atoms/SegmentedControl/SegmentedControl";
import { formatMerchantPlanPrice, MERCHANT_PLANS, type MerchantBillingPeriod, type MerchantPlan } from "@/src/domain/merchant";

export interface MerchantPricingSectionProps {
  billingPeriod: MerchantBillingPeriod;
  onBillingPeriodChange: (period: MerchantBillingPeriod) => void;
  /** Scrolls to `#formulaire` AND preselects this plan there. */
  onSelectPlan: (plan: MerchantPlan) => void;
}

const CTA_LABELS: Record<MerchantPlan, string> = {
  decouverte: "Commencer gratuitement",
  pro: "Passer au pro",
  business: "Passer au Business",
};

/** `id="conditions-vendeurs"` is the Footer's "Conditions vendeurs" anchor target — the commercial terms for a vendor are exactly these plans/conditions. */
export function MerchantPricingSection({ billingPeriod, onBillingPeriodChange, onSelectPlan }: MerchantPricingSectionProps) {
  return (
    <div id="conditions-vendeurs" className="scroll-mt-24 flex flex-col items-center gap-6 text-center">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Choisissez la formule adaptée à votre activité
        </h2>
        <p className="mt-2 text-sm text-ink-muted sm:text-base">
          Démarrez gratuitement sans carte bancaire, puis évoluez au rythme de vos projets. Résiliation libre sans pénalités.
        </p>
      </div>

      <SegmentedControl
        ariaLabel="Période de facturation"
        value={billingPeriod}
        onChange={onBillingPeriodChange}
        options={[
          { value: "monthly", label: "Mensuel" },
          { value: "annual", label: "Annuel (2 mois offerts)" },
        ]}
      />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {MERCHANT_PLANS.map((plan) => {
          const isFeatured = plan.id === "pro";
          return (
            <Card
              key={plan.id}
              variant={isFeatured ? "elevated" : "outlined"}
              className={`flex flex-col items-start gap-3 text-left ${isFeatured ? "ring-2 ring-foreground-strong" : ""}`}
            >
              {isFeatured && (
                <Chip tone="dark" size="sm" shape="pill" uppercase>
                  La plus choisie par les vendeurs
                </Chip>
              )}
              <h3 className="text-lg font-bold text-foreground-strong">{plan.name}</h3>
              {plan.tagline && <p className="text-xs text-ink-muted">{plan.tagline}</p>}
              <p className="text-3xl font-extrabold text-foreground-strong">
                {formatMerchantPlanPrice(plan, billingPeriod)}
                {plan.monthlyPrice > 0 && <span className="text-sm font-medium text-ink-muted"> /mois</span>}
              </p>
              <ul className="flex flex-col gap-1.5 text-sm text-foreground-strong">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Icon name="check-circle" size={16} className="mt-0.5 shrink-0 text-success" decorative />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={isFeatured ? "primary-md" : "soft"} className="mt-auto w-full" onClick={() => onSelectPlan(plan.id)}>
                {CTA_LABELS[plan.id]} →
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
