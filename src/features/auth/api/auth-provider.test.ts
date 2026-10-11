import { describe, expect, it } from "vitest";

import { authProvider } from "./auth-provider";

describe("authProvider", () => {
  it("authenticates a known user with the correct password", async () => {
    const result = await authProvider.authenticate({
      email: "jane@example.com",
      password: "password123",
    });
    expect("user" in result && result.user.email).toBe("jane@example.com");
  });

  it("rejects an unknown email", async () => {
    const result = await authProvider.authenticate({
      email: "nobody@example.com",
      password: "password123",
    });
    expect("error" in result).toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const result = await authProvider.authenticate({
      email: "jane@example.com",
      password: "wrong-password",
    });
    expect("error" in result).toBe(true);
  });

  it("finds a user by id without leaking the password", async () => {
    const user = await authProvider.findById("1");
    expect(user).toEqual({ id: "1", name: "Jane Doe", email: "jane@example.com" });
  });
});
