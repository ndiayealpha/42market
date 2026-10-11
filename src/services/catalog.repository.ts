import type { PreorderCampaign } from "@/src/domain/preorder";
import type { Store } from "@/src/domain/store";
import { CITY_STORES, NEARBY_STORES } from "@/src/data/stores.mock";
import { PREORDER_CAMPAIGNS } from "@/src/data/preorders.mock";

/** What the home-page hooks depend on — not a concrete implementation, so swapping the mock for a real API later never touches a component. */
export interface CatalogRepository {
  getNearbyStores(): Promise<Store[]>;
  getCityStores(): Promise<Store[]>;
  getPreorderCampaigns(): Promise<PreorderCampaign[]>;
}

export const mockCatalogRepository: CatalogRepository = {
  async getNearbyStores() {
    return NEARBY_STORES;
  },
  async getCityStores() {
    return CITY_STORES;
  },
  async getPreorderCampaigns() {
    return PREORDER_CAMPAIGNS;
  },
};
