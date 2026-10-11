import type { SessionUser } from "@/src/features/auth";

export interface ProfileViewProps {
  user: SessionUser;
}

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt className="font-medium">Name</dt>
        <dd>{user.name}</dd>
        <dt className="font-medium">Email</dt>
        <dd>{user.email}</dd>
      </dl>
    </section>
  );
}
