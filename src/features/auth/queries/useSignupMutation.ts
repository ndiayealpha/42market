"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routes } from "@/src/lib/routing/routes";

import { useAuthApi } from "../api/auth-api-provider";
import { useOnboardingActions } from "../store/onboarding.store";
import type { SignupFormValues } from "../types/auth.types";
import { authKeys } from "./auth.keys";

/**
 * Owns only the server-state half of signup: the request, the cache
 * write, and moving the onboarding step forward. Field/global error
 * mapping into the form is the caller's job (`useSignupForm`), via the
 * `onError` passed to `mutate()` — this hook has no idea React Hook
 * Form exists.
 */
export function useSignupMutation() {
  const api = useAuthApi();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setStep } = useOnboardingActions();

  return useMutation({
    mutationFn: (payload: SignupFormValues) => api.signup(payload),
    retry: false,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data.user);
      setStep("preferences");
      router.push(routes.auth.onboarding);
    },
  });
}
