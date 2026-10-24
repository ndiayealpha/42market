import { BottomNav } from "@/src/components/organisms/BottomNav/BottomNav";
import { Footer } from "@/src/components/organisms/Footer/Footer";
import { HeaderLive } from "@/src/components/organisms/Header/HeaderLive";
import { getCurrentUser } from "@/src/features/auth/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderLive user={user ? { name: user.name } : undefined} />
      {/* Bottom padding clears BottomNav (72px + safe area) on mobile only — BottomNav itself is md:hidden. */}
      <main className="flex-1 pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
