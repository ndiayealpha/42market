import type { Metadata } from "next";

import { NotFoundView } from "@/src/features/not-found/NotFoundView";

export const metadata: Metadata = {
  title: "Page introuvable | 42 Markets",
  robots: { index: false, follow: false },
};

/** Nested under `app/main/layout.tsx`, so every `notFound()` thrown by a `/main/*` page (dead product/store/order link) renders inside the same Header/Footer/BottomNav shell as the rest of the app, instead of Next's bare default 404. */
export default function MainNotFound() {
  return <NotFoundView />;
}
