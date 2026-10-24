import { NextResponse } from "next/server";

import { computeLineTotal } from "@/src/domain/cart";
import { getCurrentUser } from "@/src/features/auth/server";
import { mockOrdersRepository } from "@/src/services/orders.repository";
import { mockOrderTrackingRepository } from "@/src/services/order-tracking.repository";
import { buildReceiptPdf } from "@/src/lib/receipt-pdf";
import { formatLongDate, formatPrice } from "@/src/lib/format";

/**
 * "Reçu fiscal (PDF)" must never be generated client-side (rule 12) — a
 * route handler is the right boundary for that, and it doubles as the
 * place to check the receipt belongs to the requesting user.
 *
 * Checks two sources: the Profile's order history (`ORDER_HISTORY`,
 * pre-existing) first, then Page S's richer `FullOrder` fixtures
 * (additive — these are 2 separate datasets for 2 different screens, see
 * `src/services/orders.repository.ts` vs `order-tracking.repository.ts`).
 */
export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entries } = await mockOrdersRepository.getOrderHistory(user.id);
  const historyOrder = entries.find((entry) => entry.id === orderId);
  if (historyOrder) {
    const pdf = buildReceiptPdf({
      orderReference: historyOrder.reference,
      storeName: historyOrder.storeName,
      dateLabel: formatLongDate(historyOrder.dateIso),
      amountLabel: formatPrice(historyOrder.amount),
    });
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="recu-${historyOrder.reference.replace(/[^a-z0-9-]/gi, "")}.pdf"`,
      },
    });
  }

  const fullOrder = await mockOrderTrackingRepository.getOrderById(orderId);
  if (!fullOrder || fullOrder.ownerUserId !== user.id || !fullOrder.payment.isPaid) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const total = fullOrder.lines.reduce((sum, line) => sum + computeLineTotal(line), 0);
  const pdf = buildReceiptPdf({
    orderReference: fullOrder.reference,
    storeName: fullOrder.store.name,
    dateLabel: formatLongDate(fullOrder.createdAtIso.slice(0, 10)),
    amountLabel: formatPrice(total),
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="recu-${fullOrder.reference.replace(/[^a-z0-9-]/gi, "")}.pdf"`,
    },
  });
}
