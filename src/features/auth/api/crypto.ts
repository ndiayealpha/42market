import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal HMAC-signed token helper, used to sign the session cookie
 * without pulling in a JWT/session dependency. Pure and framework-free
 * on purpose, so it can be unit-tested without a Next.js request context.
 */

function toBase64Url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function fromBase64Url(input: string): Buffer {
  return Buffer.from(input, "base64url");
}

export function sign(payload: string, secret: string): string {
  const data = toBase64Url(payload);
  const signature = toBase64Url(createHmac("sha256", secret).update(data).digest());
  return `${data}.${signature}`;
}

/** Returns the original payload if the signature is valid, otherwise null. */
export function verify(token: string, secret: string): string | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = toBase64Url(createHmac("sha256", secret).update(data).digest());
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  return fromBase64Url(data).toString("utf8");
}
