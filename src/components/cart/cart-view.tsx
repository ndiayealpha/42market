"use client";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Button } from "@/src/stories/Button";
import { useCartActions, useCartItemCount } from "@/src/lib/cart/cart.store";

/**
 * Placeholder: see search-view.tsx's note — same pattern, for the
 * "Panier" tab. The +/- buttons here exist to demonstrate (and let you
 * manually verify) that the mobile header's basket icon and this tab's
 * badge share the same count — there's no real cart/product flow yet.
 */
export function CartView() {
  const count = useCartItemCount();
  const { increment } = useCartActions();

  return (
    <section className="flex flex-col items-center gap-4 p-10 text-center">
      <Icon name="basket" size={32} className="text-muted-foreground" decorative />
      <h1 className="text-xl font-semibold text-foreground-strong">Panier ({count})</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Bientôt disponible : vos produits en attente de retrait. Les boutons ci-dessous ne font que démontrer le compteur
        partagé avec l&apos;en-tête et la navigation du bas.
      </p>
      <div className="flex gap-2">
        <Button label="Ajouter un article" onClick={() => increment(1)} />
        <Button label="Vider" onClick={() => increment(-count)} />
      </div>
    </section>
  );
}
