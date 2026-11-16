import type { Metadata } from "next";

import { LegalPageTemplate } from "@/src/features/legal/LegalPageTemplate";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Gestion des Cookies | 42 Markets",
  alternates: { canonical: routes.main.cookiePolicy },
};

export default function CookiePolicyPage() {
  return <LegalPageTemplate title="Gestion des Cookies" />;
}
