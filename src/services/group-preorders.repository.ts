import type { GroupPreorderCampaign, GroupPreorderCategory } from "@/src/domain/group-preorder";
import { GROUP_PREORDER_CAMPAIGNS, GROUP_PREORDER_CATEGORIES } from "@/src/data/group-preorders.mock";

export interface GroupPreordersRepository {
  getCampaigns(): Promise<GroupPreorderCampaign[]>;
  getCategories(): Promise<GroupPreorderCategory[]>;
  /** No persisted reservation state (no backing order flow exists for group preorders yet) — resolves to confirm the click, same scope as every other mock mutation in this app. */
  reserve(campaignId: string): Promise<{ ok: true; campaignId: string }>;
}

export const mockGroupPreordersRepository: GroupPreordersRepository = {
  async getCampaigns() {
    return GROUP_PREORDER_CAMPAIGNS;
  },
  async getCategories() {
    return GROUP_PREORDER_CATEGORIES;
  },
  async reserve(campaignId) {
    return { ok: true, campaignId };
  },
};
