import type { Metadata } from "next";

import { MerchantOnboardingView } from "@/src/features/merchant/MerchantOnboardingView";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Rejoindre la famille 42 Markets | Ouvrir ma boutique",
  description: "Inscrivez votre épicerie sur 42 Markets : 0€ d'installation, reversé à J+7, support humain. Mise en ligne en moins de 48h.",
  alternates: { canonical: routes.main.merchantOnboarding },
};

/** Public, crawlable landing + adhesion form — same `PROTECTED_EXCEPTIONS` treatment as `howItWorks`. */
export default function MerchantOnboardingPage() {
  return <MerchantOnboardingView />;
}
