"use client";

import { useMutation } from "@tanstack/react-query";

import type { PlaceOrderInput } from "@/src/services/checkout.repository";
import { mockCheckoutRepository } from "@/src/services/checkout.repository";

export function usePlaceOrder() {
  return useMutation({
    mutationFn: (input: PlaceOrderInput) => mockCheckoutRepository.placeOrder(input),
  });
}
