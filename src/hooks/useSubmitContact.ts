"use client";

import { useMutation } from "@tanstack/react-query";

import type { ContactRequestInput } from "@/src/domain/contact";
import { mockContactRepository } from "@/src/services/contact.repository";

export function useSubmitContact() {
  return useMutation({
    mutationFn: (input: ContactRequestInput) => mockContactRepository.submit(input),
  });
}
