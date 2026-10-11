import type { AuthResult, Credentials, SessionUser } from "../types/session.types";

/**
 * Mock authentication provider. This is the single seam to swap for a
 * real backend/auth service later — see the `authenticate`/`findById`
 * signatures below; nothing else in the app should change.
 *
 * TODO(real-backend): replace the in-memory MOCK_USERS store and the
 * body of `authenticate`/`findById` with calls to the real auth API.
 */
const MOCK_USERS: Array<SessionUser & { password: string }> = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", password: "password123" },
  { id: "2", name: "Admin", email: "admin@example.com", password: "password123" },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSessionUser(user: SessionUser & { password: string }): SessionUser {
  return { id: user.id, name: user.name, email: user.email };
}

export const authProvider = {
  async authenticate({ email, password }: Credentials): Promise<AuthResult> {
    await delay(300); // simulate network latency
    const found = MOCK_USERS.find((user) => user.email === email);
    if (!found || found.password !== password) {
      return { error: "Invalid email or password." };
    }
    return { user: toSessionUser(found) };
  },

  async findById(id: string): Promise<SessionUser | null> {
    const found = MOCK_USERS.find((user) => user.id === id);
    return found ? toSessionUser(found) : null;
  },

  async register(input: RegisterInput): Promise<RegisterResult> {
    await delay(400); // simulate network latency
    const exists = MOCK_USERS.some((user) => user.email === input.email);
    if (exists) {
      return { error: "EMAIL_TAKEN", message: "Cette adresse e-mail est déjà utilisée." };
    }

    const id = String(MOCK_USERS.length + 1);
    const name = `${input.firstName} ${input.lastName}`.trim();
    MOCK_USERS.push({ id, name, email: input.email, password: input.password });
    return { user: { id, name, email: input.email } };
  },
};

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type RegisterResult = { user: SessionUser } | { error: "EMAIL_TAKEN"; message: string };
