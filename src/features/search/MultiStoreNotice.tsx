import Image from "next/image";

import { Icon } from "@/src/components/atoms/Icon/Icon";

/**
 * R5 — beige info card under the results. The original spec's wording
 * ("Un seul panier pour vos épiceries de quartier") implied one cart could
 * span several stores, which contradicts the app's real mono-store cart
 * rule (`StoreContextBar`: "Panier réservé à cette boutique", confirmed by
 * `cart.store.ts`'s single-store reset-on-switch behavior). The headline
 * is kept (it's the catchy framing people recognize) but the body copy is
 * rewritten to be honest: one cart *per* grocer, each retrieved where it
 * was bought — not one cart spanning several. See the compte-rendu for
 * this exact wording choice.
 */
export function MultiStoreNotice() {
  return (
    <div className="flex items-center gap-4 overflow-hidden rounded-2xl bg-auth-card-cream p-5 sm:gap-6">
      <Image
        src="/souk-des-saveurs.jpg"
        alt=""
        width={96}
        height={96}
        className="hidden h-24 w-24 shrink-0 rounded-xl object-cover sm:block"
      />
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-foreground-strong uppercase">
          <Icon name="basket" size={14} decorative />
          Faire ses courses multi-épiceries
        </p>
        <h2 className="mt-1 text-lg font-extrabold text-foreground-strong sm:text-xl">Un seul panier pour vos épiceries de quartier</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Composez vos achats chez plusieurs commerçants du quartier en une seule recherche : chaque épicerie garde son propre panier, à retirer
          directement sur place, sans jamais les mélanger.
        </p>
      </div>
    </div>
  );
}
