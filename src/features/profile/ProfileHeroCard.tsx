import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { StatCard } from "@/src/components/molecules/StatCard/StatCard";
import type { ProfileDetails, ProfileStats } from "@/src/domain/profile";
import { formatMemberSince } from "@/src/lib/format";

export interface ProfileHeroCardProps {
  name: string;
  profile: ProfileDetails;
  stats: ProfileStats;
}

export function ProfileHeroCard({ name, profile, stats }: ProfileHeroCardProps) {
  return (
    <Card variant="elevated" className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-4">
        <Avatar
          name={name}
          src={profile.avatarSrc}
          size={72}
          ring
          badge={profile.loyaltyTier === "vip" ? <Icon name="star" size={12} className="text-foreground-strong" /> : undefined}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-foreground-strong">{name}</h2>
            {profile.loyaltyTier === "vip" && (
              <Chip tone="gold" size="sm" shape="pill" icon={<Icon name="shield" size={12} decorative />} uppercase>
                VIP Club
              </Chip>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Membre depuis {formatMemberSince(profile.memberSinceIso)} • {profile.city} ({profile.department})
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-foreground">{profile.bio}</p>
        </div>
      </div>

      <div className="flex gap-3 sm:w-auto">
        <StatCard value={stats.ordersCount} label="Commandes" />
        <StatCard value={stats.favoritesCount} label="Favoris" />
        <StatCard value={stats.loyaltyPoints} label="Points Terroir" highlight />
      </div>
    </Card>
  );
}
