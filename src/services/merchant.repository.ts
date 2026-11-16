import type { MerchantApplication, MerchantApplicationInput } from "@/src/domain/merchant";

export interface MerchantRepository {
  /** No persisted application store/backend exists (same scope as `ContactRepository.submit`) — resolves to confirm the submission. */
  submit(input: MerchantApplicationInput): Promise<MerchantApplication>;
}

export const mockMerchantRepository: MerchantRepository = {
  async submit(input) {
    return {
      ...input,
      id: `merchant-${Date.now()}`,
      createdAtIso: new Date().toISOString(),
    };
  },
};
