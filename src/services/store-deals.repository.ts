import type { StoreDealsSummary } from "@/src/domain/store-deals";
import { STORE_DEALS } from "@/src/data/store-deals.mock";

export interface StoreDealsRepository {
  getStoreDeals(): Promise<StoreDealsSummary[]>;
}

export const mockStoreDealsRepository: StoreDealsRepository = {
  async getStoreDeals() {
    return STORE_DEALS;
  },
};
