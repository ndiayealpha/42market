import type { Metadata } from "next";

import { Footer } from "@/src/components/organisms/Footer/Footer";
import { HeaderLive } from "@/src/components/organisms/Header/HeaderLive";
import { getCurrentUser } from "@/src/features/auth/server";
import { NotFoundView } from "@/src/features/not-found/NotFoundView";

export const metadata: Metadata = {
  title: "Page introuvable | 42 Markets",
  robots: { index: false, follow: false },
};

/** Catches a 404 outside `/main` (root layout has no Header/Footer of its own) — same Header/Footer composition as `app/main/layout.tsx`, minus `BottomNav`, which assumes a signed-in `/main` session context. */
export default async function RootNotFound() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderLive user={user ? { name: user.name } : undefined} />
      <NotFoundView />
      <Footer />
    </div>
  );
}
