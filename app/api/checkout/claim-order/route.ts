import { NextResponse } from "next/server";

import { getCurrentUser } from "@/src/features/auth/server";
import { DEMO_ORDER_OWNER_COOKIE } from "@/src/lib/constants";
import { mockOrderTrackingRepository } from "@/src/services/order-tracking.repository";

/**
 * Reassigns the one fixed demo order (`checkout.repository.ts`'s
 * `placeOrder` always resolves to "cmd-4289") to whoever is actually
 * confirming it, and sets `DEMO_ORDER_OWNER_COOKIE` so Page S's ownership
 * check can read it back reliably.
 *
 * A route handler, not a plain function call, because `placeOrder`/
 * `usePlaceOrder` run entirely client-side — calling
 * `order-tracking.repository.ts` directly from there only mutates the
 * browser's own module instance, never the server's. The cookie matters
 * for the same underlying reason, one level deeper: even this route
 * handler's own in-memory `claimOrder` write lands in a *different*
 * module instance than the one `app/main/commandes/[id]/page.tsx` (a
 * Server Component) reads from — confirmed empirically, Next's dev
 * bundler doesn't guarantee Route Handlers and Server Components share a
 * module graph. A cookie is real HTTP state, not in-process JS state, so
 * it crosses that boundary where the in-memory store can't. The user is
 * read from the session here, not trusted from the request body.
 */
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = (await request.json()) as { orderId?: string };
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  await mockOrderTrackingRepository.claimOrder(orderId, user.id);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(DEMO_ORDER_OWNER_COOKIE, user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
