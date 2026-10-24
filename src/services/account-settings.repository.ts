import type { AccountSettingsSummary, NotificationPreferences } from "@/src/domain/account-settings";
import { maskPhone } from "@/src/domain/account-settings";
import {
  ACCOUNT_SETTINGS,
  ADMIN_ACCOUNT_SETTINGS,
  ADMIN_NOTIFICATION_PREFERENCES,
  NOTIFICATION_PREFERENCES,
} from "@/src/data/account-settings.mock";
import { ADMIN_PROFILE_DETAILS, PROFILE_DETAILS } from "@/src/data/profile.mock";

export interface AccountSettingsRepository {
  getSettings(userId: string): Promise<AccountSettingsSummary | null>;
  getNotificationPreferences(userId: string): Promise<NotificationPreferences | null>;
  updateNotificationPreferences(userId: string, preferences: NotificationPreferences): Promise<NotificationPreferences>;
  /** Mock stub — real account deletion needs a backend + legal/compliance flow (rule 8 "sécurité/RGPD"), out of scope here. */
  deleteAccount(userId: string): Promise<void>;
}

/** Keyed by `SessionUser.id` — the two demo accounts from `auth-provider.ts` ("1" Jane Doe, "2" Admin). */
const ACCOUNT_SETTINGS_BY_USER_ID: Record<string, AccountSettingsSummary> = {
  [PROFILE_DETAILS.id]: ACCOUNT_SETTINGS,
  [ADMIN_PROFILE_DETAILS.id]: ADMIN_ACCOUNT_SETTINGS,
};

// Mutable only to let the mock persist each account's toggle across calls
// within one session — a stand-in for a real backend, never read/written
// anywhere else.
const notificationPreferencesByUserId: Record<string, NotificationPreferences> = {
  [PROFILE_DETAILS.id]: { ...NOTIFICATION_PREFERENCES },
  [ADMIN_PROFILE_DETAILS.id]: { ...ADMIN_NOTIFICATION_PREFERENCES },
};

export const mockAccountSettingsRepository: AccountSettingsRepository = {
  async getSettings(userId) {
    const settings = ACCOUNT_SETTINGS_BY_USER_ID[userId];
    if (!settings) return null;
    // Masking happens here, at the data boundary, never in a component (rule 8: "téléphone masqué côté serveur").
    return { ...settings, phone: maskPhone(settings.phone) };
  },
  async getNotificationPreferences(userId) {
    return notificationPreferencesByUserId[userId] ?? null;
  },
  async updateNotificationPreferences(userId, preferences) {
    if (notificationPreferencesByUserId[userId]) {
      notificationPreferencesByUserId[userId] = preferences;
    }
    return preferences;
  },
  async deleteAccount() {
    // No-op mock — see interface doc comment.
  },
};
