import type { Metadata } from "next";

import { LegalPageTemplate } from "@/src/features/legal/LegalPageTemplate";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | 42 Markets",
  alternates: { canonical: routes.main.privacyPolicy },
};

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate title="Politique de Confidentialité" />;
}
