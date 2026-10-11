import { redirect } from "next/navigation";

import { SignupPage } from "@/src/features/auth";
import { getCurrentUser } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";

export default async function CreateAccountPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(routes.main.home);
  }

  return <SignupPage />;
}
