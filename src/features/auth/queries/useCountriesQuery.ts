"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthApi } from "../api/auth-api-provider";
import { authKeys } from "./auth.keys";

/**
 * The country list never changes during a session, so it's cached
 * forever (`staleTime: Infinity`) and kept around long after the last
 * observer unmounts (`gcTime`) — CountryCodeSelect can close and reopen
 * without a single extra request.
 */
export function useCountriesQuery() {
  const api = useAuthApi();

  return useQuery({
    queryKey: authKeys.countries(),
    queryFn: () => api.getCountries(),
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    select: (countries) => [...countries].sort((a, b) => a.name.localeCompare(b.name, "fr")),
  });
}
