import { COUNTRIES } from "../schemas/countries.data";
import type { AuthApi } from "./auth.api";
import { SignupApiError } from "./auth.api";

function delay(ms = 50): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Base mock: always succeeds, near-instant. Override per scenario below. */
export function createMockAuthApi(overrides: Partial<AuthApi> = {}): AuthApi {
  return {
    async signup(payload) {
      await delay();
      return {
        user: { id: "mock-user-1", name: `${payload.firstName} ${payload.lastName}`, email: payload.email },
      };
    },
    async getCountries() {
      await delay();
      return COUNTRIES;
    },
    ...overrides,
  };
}

export const mockAuthApiSuccess = createMockAuthApi();

export const mockAuthApiEmailTaken = createMockAuthApi({
  async signup() {
    await delay();
    const message = "Cette adresse e-mail est déjà utilisée.";
    throw new SignupApiError(message, [{ field: "email", message }]);
  },
});

export const mockAuthApiNetworkError = createMockAuthApi({
  async signup() {
    await delay();
    throw new SignupApiError("Impossible de contacter le serveur. Réessayez.");
  },
});

export const mockAuthApiPending = createMockAuthApi({
  signup: () => new Promise(() => {}), // never resolves — for a permanent "submitting" story
});
