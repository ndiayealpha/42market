"use server";

import { redirect } from "next/navigation";

import { resolveCallbackUrl, routes } from "@/src/lib/routing/routes";
import { authProvider } from "./auth-provider";
import { createSession, deleteSession } from "./session";
import type { Credentials } from "../types/session.types";

export async function loginAction(
  credentials: Credentials,
  callbackUrl?: string
): Promise<{ error: string } | void> {
  const result = await authProvider.authenticate(credentials);
  if ("error" in result) {
    return { error: result.error };
  }

  await createSession(result.user);
  // redirect() throws; keep it outside any try/catch in this file.
  redirect(resolveCallbackUrl(callbackUrl));
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect(routes.auth.login);
}
