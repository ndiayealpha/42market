"use client";

import { useState } from "react";

import { Container } from "@/src/components/layout/Container/Container";
import type { MerchantBillingPeriod, MerchantPlan } from "@/src/domain/merchant";

import { MerchantApplicationForm } from "./MerchantApplicationForm";
import { MerchantDemoSection } from "./MerchantDemoSection";
import { MerchantFaqSection } from "./MerchantFaqSection";
import { MerchantFinalCta } from "./MerchantFinalCta";
import { MerchantHero } from "./MerchantHero";
import { MerchantPricingSection } from "./MerchantPricingSection";
import { MerchantStepsSection } from "./MerchantStepsSection";
import { MerchantTestimonialBanner } from "./MerchantTestimonialBanner";
import { MerchantTestimonialsSection } from "./MerchantTestimonialsSection";
import { MerchantTrustSection } from "./MerchantTrustSection";

/**
 * The one client component on this page (everything else is static
 * marketing copy) — it owns `selectedPlan`/`billingPeriod` so a pricing
 * card's CTA (further down the page) can update the application form
 * (further up) before the native `href="#formulaire"` anchor scrolls there.
 */
export function MerchantOnboardingView() {
  const [selectedPlan, setSelectedPlan] = useState<MerchantPlan>("decouverte");
  const [billingPeriod, setBillingPeriod] = useState<MerchantBillingPeriod>("monthly");

  function handleSelectPlan(plan: MerchantPlan) {
    setSelectedPlan(plan);
    document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Container className="flex flex-col gap-14 py-10">
      <MerchantHero />
      <MerchantStepsSection />
      <MerchantTestimonialBanner />
      <MerchantApplicationForm selectedPlan={selectedPlan} />
      <MerchantDemoSection />
      <MerchantTrustSection />
      <MerchantPricingSection billingPeriod={billingPeriod} onBillingPeriodChange={setBillingPeriod} onSelectPlan={handleSelectPlan} />
      <MerchantTestimonialsSection />
      <MerchantFaqSection />
      <MerchantFinalCta />
    </Container>
  );
}
