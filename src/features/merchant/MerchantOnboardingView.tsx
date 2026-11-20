import { Container } from "@/src/components/layout/Container/Container";

import { MerchantApplicationForm } from "./MerchantApplicationForm";
import { MerchantDemoSection } from "./MerchantDemoSection";
import { MerchantFaqSection } from "./MerchantFaqSection";
import { MerchantFinalCta } from "./MerchantFinalCta";
import { MerchantHero } from "./MerchantHero";
import { MerchantStepsSection } from "./MerchantStepsSection";
import { MerchantTestimonialBanner } from "./MerchantTestimonialBanner";
import { MerchantTestimonialsSection } from "./MerchantTestimonialsSection";
import { MerchantTrustSection } from "./MerchantTrustSection";

/** F7 (2026-11-17 UAT): no more pricing section — removed along with the plan-picker state it alone drove. */
export function MerchantOnboardingView() {
  return (
    <Container className="flex flex-col gap-14 py-10">
      <MerchantHero />
      <MerchantStepsSection />
      <MerchantTestimonialBanner />
      <MerchantApplicationForm />
      <MerchantDemoSection />
      <MerchantTrustSection />
      <MerchantTestimonialsSection />
      <MerchantFaqSection />
      <MerchantFinalCta />
    </Container>
  );
}
