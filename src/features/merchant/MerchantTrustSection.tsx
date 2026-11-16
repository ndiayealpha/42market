import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";

import { MERCHANT_TRUST_ITEMS } from "./merchant-onboarding.constants";

/** `id="charte-qualite"` is the Footer's "Charte qualité" anchor target — no dedicated page exists for it, this section is its content (rule: anchor into the Commerçants page rather than a 3rd near-empty page). */
export function MerchantTrustSection() {
  return (
    <div id="charte-qualite" className="scroll-mt-24 flex flex-col items-center gap-6 text-center">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Le pacte de confiance entre nos épiciers et nos familles
        </h2>
        <p className="mt-2 text-sm text-ink-muted sm:text-base">
          Nos clients viennent chercher chez leur commerçant le goût et la qualité du pays. Ensemble, nous valorisons l&apos;excellence des produits
          d&apos;Afrique et d&apos;ailleurs.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {MERCHANT_TRUST_ITEMS.map((item) => (
          <Card key={item.title} variant="outlined" className="flex flex-col items-start gap-2 text-left">
            <Icon name={item.icon} size={20} className="text-foreground-strong" decorative />
            <h3 className="text-sm font-bold text-foreground-strong">{item.title}</h3>
            <p className="text-sm text-ink-muted">{item.description}</p>
            <p className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-success">
              <Icon name="check-circle" size={14} decorative />
              {item.footnote}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
