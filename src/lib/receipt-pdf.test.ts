import { describe, expect, it } from "vitest";

import { buildReceiptPdf } from "./receipt-pdf";

describe("buildReceiptPdf", () => {
  const pdf = buildReceiptPdf({
    orderReference: "#CMD-9021",
    storeName: "Épicerie Partenaire LoirIvoire",
    dateLabel: "14 février 2026",
    amountLabel: "24,50 €",
  });
  const text = pdf.toString("utf-8");

  it("starts with the PDF header and ends with %%EOF", () => {
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    expect(text.endsWith("%%EOF")).toBe(true);
  });

  it("embeds the order reference and amount in the content stream", () => {
    expect(text).toContain("#CMD-9021");
    expect(text).toContain("24,50");
  });

  it("escapes PDF-reserved characters so a store name can't break the stream", () => {
    const withParens = buildReceiptPdf({
      orderReference: "#CMD-1",
      storeName: "Épicerie (Centre)",
      dateLabel: "1 janvier 2026",
      amountLabel: "1,00 €",
    }).toString("utf-8");
    expect(withParens).toContain("\\(Centre\\)");
  });

  it("writes one xref entry per object plus the free-list head", () => {
    const xrefSection = text.split("xref\n")[1].split("trailer")[0];
    const lines = xrefSection.trim().split("\n");
    const subsectionHeader = lines[0];
    const entries = lines.slice(1);
    expect(subsectionHeader).toBe("0 6"); // 5 objects + the free-list head
    expect(entries).toHaveLength(6);
  });
});
