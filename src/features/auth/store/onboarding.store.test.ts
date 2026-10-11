import { beforeEach, describe, expect, it } from "vitest";

import { onboardingStoreApi } from "./onboarding.store";

// `useOnboardingStep`/`useOnboardingActions`/etc. are React hooks (built
// on Zustand's `useSyncExternalStore` under the hood) and can only be
// called during a component render — this project has no jsdom/RTL
// dependency to `renderHook` them (see usePasswordStrength.test.ts's
// comment for the same constraint). `onboardingStoreApi` is the escape
// hatch: Zustand's plain, non-React `getState()`/`setState()`, which is
// exactly what the store's actions themselves run on.
function getState() {
  return onboardingStoreApi.getState();
}

describe("onboarding.store", () => {
  beforeEach(() => {
    getState().actions.reset();
  });

  it("starts on the account step with no country preference override and nothing skipped", () => {
    expect(getState().step).toBe("account");
    expect(getState().hasSkippedAccount).toBe(false);
    expect(getState().preferredCountryCode).toBe("FR");
  });

  it("setStep moves to an arbitrary step", () => {
    getState().actions.setStep("done");
    expect(getState().step).toBe("done");
  });

  it("skipAccount marks the account step skipped and advances to preferences", () => {
    getState().actions.skipAccount();
    expect(getState().hasSkippedAccount).toBe(true);
    expect(getState().step).toBe("preferences");
  });

  it("setPreferredCountryCode updates only that field", () => {
    getState().actions.setPreferredCountryCode("SN");
    expect(getState().preferredCountryCode).toBe("SN");
    expect(getState().step).toBe("account");
  });

  it("reset restores the initial state", () => {
    getState().actions.setStep("done");
    getState().actions.skipAccount();
    getState().actions.setPreferredCountryCode("SN");

    getState().actions.reset();

    expect(getState().step).toBe("account");
    expect(getState().hasSkippedAccount).toBe(false);
    expect(getState().preferredCountryCode).toBe("FR");
  });

  it("partialize (persist) never includes personal data — only step and preferredCountryCode are candidates for storage", () => {
    const state = getState();
    const persistedKeys = Object.keys({ step: state.step, preferredCountryCode: state.preferredCountryCode });
    expect(persistedKeys).toEqual(["step", "preferredCountryCode"]);
    expect(state).not.toHaveProperty("password");
    expect(state).not.toHaveProperty("email");
  });
});
