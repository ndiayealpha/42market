import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { DashboardView } from "@/src/components/dashboard/dashboard-view";

export default async function HomePage() {
  const user = await verifySession(routes.main.home);
  return <DashboardView user={user} />;
}
