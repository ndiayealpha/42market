import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { SettingsView } from "@/src/components/settings/settings-view";

export default async function SettingsPage() {
  const user = await verifySession(routes.main.settings);
  return <SettingsView user={user} />;
}
