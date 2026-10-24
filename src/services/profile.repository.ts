import type { ProfileDetails, ProfileStats } from "@/src/domain/profile";
import type { ReferenceStore } from "@/src/domain/reference-store";
import type { Terroir } from "@/src/domain/terroir";
import {
  ADMIN_PROFILE_DETAILS,
  ADMIN_PROFILE_STATS,
  ADMIN_TERROIRS,
  PROFILE_DETAILS,
  PROFILE_STATS,
  REFERENCE_STORE,
  TERROIR_SUGGESTION_LABEL,
  TERROIRS,
} from "@/src/data/profile.mock";

export interface TerroirsSummary {
  terroirs: Terroir[];
  suggestionLabel: string;
}

export interface ProfileRepository {
  getProfile(userId: string): Promise<ProfileDetails | null>;
  getStats(userId: string): Promise<ProfileStats | null>;
  getTerroirs(userId: string): Promise<TerroirsSummary>;
  /** `null` when the user hasn't picked a reference store yet (N5's EmptyState). */
  getReferenceStore(userId: string): Promise<ReferenceStore | null>;
}

/** Keyed by `SessionUser.id` — the two demo accounts from `auth-provider.ts` ("1" Jane Doe, "2" Admin). Any other id resolves to nothing. */
const PROFILE_DETAILS_BY_USER_ID: Record<string, ProfileDetails> = {
  [PROFILE_DETAILS.id]: PROFILE_DETAILS,
  [ADMIN_PROFILE_DETAILS.id]: ADMIN_PROFILE_DETAILS,
};
const PROFILE_STATS_BY_USER_ID: Record<string, ProfileStats> = {
  [PROFILE_DETAILS.id]: PROFILE_STATS,
  [ADMIN_PROFILE_DETAILS.id]: ADMIN_PROFILE_STATS,
};
const TERROIRS_BY_USER_ID: Record<string, Terroir[]> = {
  [PROFILE_DETAILS.id]: TERROIRS,
  [ADMIN_PROFILE_DETAILS.id]: ADMIN_TERROIRS,
};
const REFERENCE_STORE_BY_USER_ID: Record<string, ReferenceStore> = {
  [PROFILE_DETAILS.id]: REFERENCE_STORE,
  // Admin fixture has no reference store yet — exercises N5's EmptyState branch.
};

export const mockProfileRepository: ProfileRepository = {
  async getProfile(userId) {
    return PROFILE_DETAILS_BY_USER_ID[userId] ?? null;
  },
  async getStats(userId) {
    return PROFILE_STATS_BY_USER_ID[userId] ?? null;
  },
  async getTerroirs(userId) {
    return { terroirs: TERROIRS_BY_USER_ID[userId] ?? [], suggestionLabel: TERROIR_SUGGESTION_LABEL };
  },
  async getReferenceStore(userId) {
    return REFERENCE_STORE_BY_USER_ID[userId] ?? null;
  },
};
