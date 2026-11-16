import type { Metadata } from "next";

import { LegalPageTemplate } from "@/src/features/legal/LegalPageTemplate";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "CGV & Rétractation | 42 Markets",
  alternates: { canonical: routes.main.termsOfSale },
};

export default function TermsOfSalePage() {
  return <LegalPageTemplate title="CGV & Rétractation" />;
}
