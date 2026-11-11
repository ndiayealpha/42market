import { sortFaqItems, type FaqItem } from "@/src/domain/faq";
import { FAQ_ITEMS } from "@/src/data/faq.mock";

export interface FaqRepository {
  list(category?: string | null): Promise<FaqItem[]>;
}

export const mockFaqRepository: FaqRepository = {
  async list(category) {
    const items = category ? FAQ_ITEMS.filter((item) => item.category === category) : FAQ_ITEMS;
    return sortFaqItems(items);
  },
};
