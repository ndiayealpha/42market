import type { Metadata } from "next";

import { HowItWorksTemplate } from "@/src/features/how-it-works/HowItWorksTemplate";

export const metadata: Metadata = {
  title: "Comment ça marche | 42 Markets",
  description: "Le parcours en 4 étapes pour retrouver les saveurs de la maison en Click & Collect auprès de vos épiceries exotiques de quartier.",
};

/** Public marketing page — same `PROTECTED_EXCEPTIONS` treatment as `bonsPlans`/`search`, no `verifySession`. */
export default function HowItWorksPage() {
  return <HowItWorksTemplate />;
}
