import type { NewArrivalCategory, NewArrivalSection } from "@/src/domain/new-arrival";
import { NEW_ARRIVAL_CATEGORIES, NEW_ARRIVAL_SECTIONS } from "@/src/data/new-arrivals.mock";

export interface NewArrivalsRepository {
  getSections(): Promise<NewArrivalSection[]>;
  getCategories(): Promise<NewArrivalCategory[]>;
}

export const mockNewArrivalsRepository: NewArrivalsRepository = {
  async getSections() {
    return NEW_ARRIVAL_SECTIONS;
  },
  async getCategories() {
    return NEW_ARRIVAL_CATEGORIES;
  },
};
