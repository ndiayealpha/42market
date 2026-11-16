import { describe, expect, it } from "vitest";

import { getCarouselRowTemplate } from "./Carousel";

describe("getCarouselRowTemplate", () => {
  it("gives a 1-row template a minimum, not a hard cap", () => {
    expect(getCarouselRowTemplate(1, [320, 320])).toBe("minmax(320px, auto)");
  });

  it("gives a 2-row template a minimum per row", () => {
    expect(getCarouselRowTemplate(2, [230, 220])).toBe("minmax(230px, auto) minmax(220px, auto)");
  });

  it("never emits a bare pixel value — that's what silently clipped overflowing content", () => {
    const template = getCarouselRowTemplate(1, [290, 290]);
    expect(template).not.toBe("290px");
    expect(template).toMatch(/^minmax\(\d+px, auto\)$/);
  });
});
