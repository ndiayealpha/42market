import { redirect } from "next/navigation";

import { LoginPage } from "@/src/features/auth";
import { getCurrentUser } from "@/src/features/auth/server";
import { resolveCallbackUrl } from "@/src/lib/routing/routes";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const user = await getCurrentUser();
  const { callbackUrl } = await searchParams;

  if (user) {
    redirect(resolveCallbackUrl(callbackUrl));
  }

  return <LoginPage />;
}
