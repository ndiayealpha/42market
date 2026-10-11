import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { PromoDemoView } from "@/src/components/promo-demo/promo-demo-view";

export default async function PromoDemoPage() {
  await verifySession(routes.main.promoDemo);
  return <PromoDemoView />;
}
