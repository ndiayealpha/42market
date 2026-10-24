import type { Metadata } from "next";

import { STORE_DETAIL } from "@/src/data/store-detail.mock";
import { verifySession } from "@/src/features/auth/server";
import { CheckoutView } from "@/src/features/checkout/CheckoutView";
import { routes } from "@/src/lib/routing/routes";
import { mockAccountSettingsRepository } from "@/src/services/account-settings.repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Retrait Express en Épicerie | 42 Markets",
  robots: { index: false, follow: false },
};

/**
 * Page K. Protected (same `verifySession` idiom as
 * `app/main/epiceries/[slug]/rayons/page.tsx`), `noindex`, dynamic.
 *
 * The brief also asks for a server-side redirect to `/main/panier` when
 * the cart is empty — not done here: the cart (`cart-lines.store.ts`) is
 * an in-memory, client-only zustand store with no persistence, so this
 * Server Component has no way to read it. `CheckoutView` redirects
 * client-side on mount instead; see its own doc comment for the full
 * reasoning.
 */
export default async function CheckoutPage() {
  const user = await verifySession(routes.main.checkout);
  const settings = await mockAccountSettingsRepository.getSettings(user.id);
  const now = new Date();

  return (
    <CheckoutView
      now={now}
      store={STORE_DETAIL}
      isPhoneVerified={settings?.isPhoneVerified ?? false}
      supportPhone={STORE_DETAIL.phone}
      year={now.getFullYear()}
    />
  );
}
