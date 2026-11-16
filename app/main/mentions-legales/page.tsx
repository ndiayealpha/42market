import type { Metadata } from "next";

import { LegalPageTemplate } from "@/src/features/legal/LegalPageTemplate";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Mentions Légales | 42 Markets",
  alternates: { canonical: routes.main.legalNotice },
};

export default function LegalNoticePage() {
  return <LegalPageTemplate title="Mentions Légales" />;
}
