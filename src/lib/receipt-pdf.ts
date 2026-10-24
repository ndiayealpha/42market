/**
 * Hand-built, minimal valid single-page PDF (no new dependency — a real
 * PDF library would need an explicit "propose before installing", rule
 * 11). Byte offsets for the xref table are computed from the actual
 * encoded objects, never hardcoded, so the output stays valid regardless
 * of content length. Server-side only (route handler) — "Reçu fiscal"
 * must never be generated client-side (rule 12).
 */
export interface ReceiptContent {
  orderReference: string;
  storeName: string;
  dateLabel: string;
  amountLabel: string;
}

function escapePdfText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function buildReceiptPdf(content: ReceiptContent): Buffer {
  const lines = [
    "Reçu fiscal — 42 Markets",
    `Commande ${content.orderReference}`,
    `Commerçant : ${content.storeName}`,
    `Date : ${content.dateLabel}`,
    `Montant TTC : ${content.amountLabel}`,
  ];

  const textOps = lines
    .map((line, index) => `BT /F1 12 Tf 20 ${260 - index * 20} Td (${escapePdfText(line)}) Tj ET`)
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 300] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${textOps.length} >>\nstream\n${textOps}\nendstream`,
  ];

  let body = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((content, index) => {
    offsets.push(body.length);
    body += `${index + 1} 0 obj\n${content}\nendobj\n`;
  });

  const xrefOffset = body.length;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    xref += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(body + xref + trailer, "utf-8");
}
