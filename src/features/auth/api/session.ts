import { cookies } from "next/headers";

import { sign, verify } from "./crypto";
import type { SessionUser } from "../types/session.types";

const SESSION_COOKIE = "42m_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production.");
  }
  // Development-only fallback so `next dev` works without extra setup.
  return "dev-only-insecure-secret-do-not-use-in-production";
}

interface SessionPayload extends SessionUser {
  expiresAt: number;
}

export async function createSession(user: SessionUser): Promise<void> {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload: SessionPayload = { ...user, expiresAt };
  const token = sign(JSON.stringify(payload), getSecret());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const json = verify(token, getSecret());
  if (!json) return null;

  try {
    const payload = JSON.parse(json) as SessionPayload;
    if (payload.expiresAt < Date.now()) return null;
    return { id: payload.id, name: payload.name, email: payload.email };
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
