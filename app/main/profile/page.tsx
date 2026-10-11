import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { ProfileView } from "@/src/components/profile/profile-view";

export default async function ProfilePage() {
  const user = await verifySession(routes.main.profile);
  return <ProfileView user={user} />;
}
