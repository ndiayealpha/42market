export type LoyaltyTier = "none" | "vip";

/** The loyalty program's numbers — one source, not hardcoded in `LoyaltyBanner`'s copy. */
export const LOYALTY_PROGRAM_CONFIG = {
  cashbackPercent: 5,
  voucherThresholdAmount: 10,
};

/**
 * Profile/loyalty data about a user, fetched by id. Deliberately NOT
 * merged into `SessionUser` (the signed session-cookie payload, see
 * `src/features/auth/types/session.types.ts`): bio/points/city change
 * far more often than identity and would bloat/stale the cookie. This
 * is not a second "User" identity type — it's profile detail keyed by
 * the same `id`, fetched through its own repository/hook.
 */
export interface ProfileDetails {
  id: string;
  avatarSrc?: string;
  bio: string;
  /** ISO date (first day of the join month is fine — only month/year are shown). */
  memberSinceIso: string;
  city: string;
  department: string;
  loyaltyTier: LoyaltyTier;
  isVerified: boolean;
}

export interface ProfileStats {
  ordersCount: number;
  favoritesCount: number;
  loyaltyPoints: number;
}
