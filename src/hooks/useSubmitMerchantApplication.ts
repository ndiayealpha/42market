"use client";

import { useMutation } from "@tanstack/react-query";

import type { MerchantApplicationInput } from "@/src/domain/merchant";
import { mockMerchantRepository } from "@/src/services/merchant.repository";

export function useSubmitMerchantApplication() {
  return useMutation({
    mutationFn: (input: MerchantApplicationInput) => mockMerchantRepository.submit(input),
  });
}
