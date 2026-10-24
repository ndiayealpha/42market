"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { FullOrder } from "@/src/domain/orders";
import { mockOrderTrackingRepository } from "@/src/services/order-tracking.repository";
import { useToast } from "@/src/providers/toast-provider";

import { orderQueryKey } from "./useOrderTracking";

/** Optimistic toggle for S1's reminder button: flip the cached value immediately, roll it back and toast on failure (same `onMutate`/rollback shape as `useToggleFavorite`). */
export function useOrderReminder(orderId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const queryKey = orderQueryKey(orderId);

  const mutation = useMutation({
    mutationFn: (enabled: boolean) => mockOrderTrackingRepository.setReminderEnabled(orderId, enabled),
    onMutate: async (enabled: boolean) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<FullOrder | null>(queryKey);
      if (previous) {
        queryClient.setQueryData<FullOrder>(queryKey, { ...previous, reminderEnabled: enabled });
      }
      return { previous };
    },
    onError: (_error, _enabled, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      toast.show("Impossible de mettre à jour le rappel, réessayez.", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    toggle: (enabled: boolean) => mutation.mutate(enabled),
    isPending: mutation.isPending,
  };
}
