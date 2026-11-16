import { Container } from "@/src/components/layout/Container/Container";
import type { ContactMotif } from "@/src/domain/contact";
import type { FormSelectOption } from "@/src/components/molecules/FormSelectField/FormSelectField";

import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";

export interface ContactTemplateProps {
  storeOptions: FormSelectOption[];
  initialMotif?: ContactMotif;
  initialStoreSlug?: string;
}

export function ContactTemplate({ storeOptions, initialMotif, initialStoreSlug }: ContactTemplateProps) {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <ContactHero />
      <div className="mx-auto w-full max-w-2xl">
        <ContactForm storeOptions={storeOptions} initialMotif={initialMotif} initialStoreSlug={initialStoreSlug} />
      </div>
    </Container>
  );
}
