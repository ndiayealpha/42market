import { describe, expect, it } from "vitest";

import { mockOrdersRepository } from "@/src/services/orders.repository";
import { ADMIN_PROFILE_DETAILS, PROFILE_DETAILS } from "@/src/data/profile.mock";
import { REFERENCE_ORDER } from "@/src/data/full-order.mock";

describe("mockOrdersRepository.getActiveOrder", () => {
  it("prefers a live, still-pending FullOrder (e.g. one just placed via checkout) over the static fixture", async () => {
    const active = await mockOrdersRepository.getActiveOrder(PROFILE_DETAILS.id);
    expect(active?.id).toBe(REFERENCE_ORDER.id);
    expect(active?.reference).toBe(REFERENCE_ORDER.reference);
    expect(active?.itemsSummary).toContain(REFERENCE_ORDER.lines[0].name);
  });

  it("falls back to the static fixture for a user with no live pending FullOrder", async () => {
    // ADMIN_ORDER (the only FullOrder owned by user "2") is a copy of REFERENCE_ORDER with status "preparing",
    // so the Admin account's result should come from the FullOrder bridge too — not the legacy ADMIN_ACTIVE_ORDER.
    const active = await mockOrdersRepository.getActiveOrder(ADMIN_PROFILE_DETAILS.id);
    expect(active).not.toBeNull();
  });

  it("returns null for an unknown user", async () => {
    expect(await mockOrdersRepository.getActiveOrder("unknown-user")).toBeNull();
  });
});
