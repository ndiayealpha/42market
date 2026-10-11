import type { SessionUser } from "@/src/features/auth";

export interface SettingsViewProps {
  user: SessionUser;
}

export function SettingsView({ user }: SettingsViewProps) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-gray-600">Signed in as {user.email}.</p>
    </section>
  );
}
