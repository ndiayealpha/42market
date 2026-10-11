import type { Credentials, SessionUser } from "../types/session.types";
import { loginAction, logoutAction } from "./auth.actions";

/**
 * The boundary `SessionProvider` talks to. In the real app this wraps
 * the server actions; in Storybook/tests it is swapped for a mock via
 * the `authClient` prop, so no component needs to know the difference.
 */
export interface AuthClient {
  login: (
    credentials: Credentials,
    callbackUrl?: string
  ) => Promise<{ error?: string; user?: SessionUser } | void>;
  logout: () => Promise<void>;
}

export const defaultAuthClient: AuthClient = {
  login: loginAction,
  logout: logoutAction,
};
