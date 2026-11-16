import { FaqAccordion } from "@/src/features/faq/FaqAccordion";

import { MERCHANT_FAQ_ITEMS } from "./merchant-onboarding.constants";

/** `id="faq"` is the Footer's "FAQ épiciers exotiques" anchor target. Reuses `FaqAccordion` (built for the customer-facing FAQ page) instead of a third accordion implementation — same component, different `FaqItem[]`. */
export function MerchantFaqSection() {
  return (
    <div id="faq" className="scroll-mt-24 flex flex-col gap-6">
      <h2 className="text-center text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
        Questions fréquentes des épiciers
      </h2>
      <FaqAccordion items={MERCHANT_FAQ_ITEMS} />
    </div>
  );
}
