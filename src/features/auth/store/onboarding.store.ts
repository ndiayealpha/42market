import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DEFAULT_COUNTRY_CODE } from "../schemas/countries.data";

export type OnboardingStep = "account" | "preferences" | "done";

interface OnboardingState {
  step: OnboardingStep;
  hasSkippedAccount: boolean;
  preferredCountryCode: string;
}

interface OnboardingActions {
  setStep: (step: OnboardingStep) => void;
  skipAccount: () => void;
  setPreferredCountryCode: (code: string) => void;
  reset: () => void;
}

type OnboardingStore = OnboardingState & { actions: OnboardingActions };

const initialState: OnboardingState = {
  step: "account",
  hasSkippedAccount: false,
  preferredCountryCode: DEFAULT_COUNTRY_CODE,
};

// No-op fallback for SSR and the (DOM-less) Node test environment —
// `sessionStorage` doesn't exist there, and persist's storage adapter
// calls `.setItem`/`.getItem` unconditionally, so an `undefined` engine
// throws rather than silently skipping persistence.
const noopStorage: Storage = {
  length: 0,
  clear: () => {},
  key: () => null,
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

/**
 * Client-side, cross-screen onboarding progress only. Never the place
 * for form values or anything server-owned — see the state-ownership
 * rule: form state lives in React Hook Form, server data in TanStack
 * Query, and only navigation/UI preference here.
 */
const useOnboardingStoreInternal = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setStep: (step) => set({ step }),
        skipAccount: () => set({ hasSkippedAccount: true, step: "preferences" }),
        setPreferredCountryCode: (preferredCountryCode) => set({ preferredCountryCode }),
        reset: () => set({ ...initialState }),
      },
    }),
    {
      name: "42markets-onboarding",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.sessionStorage : noopStorage)),
      // Never the name/email/password — only navigation progress and a
      // UI preference are worth surviving a refresh.
      partialize: (state) => ({
        step: state.step,
        preferredCountryCode: state.preferredCountryCode,
      }),
    }
  )
);

// Components subscribe to one slice at a time, never the whole store —
// an unrelated field changing should never re-render them.
export const useOnboardingStep = (): OnboardingStep => useOnboardingStoreInternal((state) => state.step);
export const useHasSkippedAccount = (): boolean => useOnboardingStoreInternal((state) => state.hasSkippedAccount);
export const usePreferredCountryCode = (): string =>
  useOnboardingStoreInternal((state) => state.preferredCountryCode);
export const useOnboardingActions = (): OnboardingActions => useOnboardingStoreInternal((state) => state.actions);

/** Test-only escape hatch to reset store state between tests/stories. */
export const onboardingStoreApi = useOnboardingStoreInternal;
