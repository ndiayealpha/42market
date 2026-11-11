"use client";

import { useMutation } from "@tanstack/react-query";

import { mockGroupPreordersRepository } from "@/src/services/group-preorders.repository";

export function useReserveGroupPreorder() {
  return useMutation({
    mutationFn: (campaignId: string) => mockGroupPreordersRepository.reserve(campaignId),
  });
}
