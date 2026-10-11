import { describe, expect, it } from "vitest";

import { sign, verify } from "./crypto";

describe("crypto", () => {
  it("round-trips a signed payload", () => {
    const token = sign("hello", "secret");
    expect(verify(token, "secret")).toBe("hello");
  });

  it("rejects a payload signed with a different secret", () => {
    const token = sign("hello", "secret");
    expect(verify(token, "other")).toBeNull();
  });

  it("rejects a tampered token", () => {
    const [data] = sign("hello", "secret").split(".");
    expect(verify(`${data}.tampered`, "secret")).toBeNull();
  });

  it("rejects a malformed token", () => {
    expect(verify("not-a-token", "secret")).toBeNull();
  });
});
