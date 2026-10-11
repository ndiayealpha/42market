import { redirect } from "next/navigation";

import { getCurrentUser } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import OnBoarding from "../onBoarding";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(routes.main.home);
  }

  return <OnBoarding />;
}
