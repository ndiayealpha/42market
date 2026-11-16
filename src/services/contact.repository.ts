import type { ContactRequest, ContactRequestInput } from "@/src/domain/contact";

export interface ContactRepository {
  /** No persisted request store/backend exists (same scope as `GroupPreordersRepository.reserve`) — resolves to confirm the submission, routed conceptually to the store's own team or logistics per the input's `storeSlug`. */
  submit(input: ContactRequestInput): Promise<ContactRequest>;
}

export const mockContactRepository: ContactRepository = {
  async submit(input) {
    return {
      ...input,
      id: `contact-${Date.now()}`,
      createdAtIso: new Date().toISOString(),
    };
  },
};
