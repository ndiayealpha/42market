"use client";

import { useQuery } from "@tanstack/react-query";

import { mockNotificationsRepository } from "@/src/services/notifications.repository";

export function useNotificationsAverage() {
  const query = useQuery({
    queryKey: ["notifications", "average-per-day"],
    queryFn: () => mockNotificationsRepository.getAverageNotificationsPerDay(),
  });
  return query.data ?? 0;
}
