import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { CartView } from "@/src/components/cart/cart-view";

export default async function CartPage() {
  await verifySession(routes.main.cart);
  return <CartView />;
}
