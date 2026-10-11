import { NewsletterForm, type NewsletterFormProps } from "@/src/components/molecules/NewsletterForm/NewsletterForm";
import { SocialLinks } from "@/src/components/molecules/SocialLinks/SocialLinks";

export interface FooterCommunityProps {
  onSubscribe?: NewsletterFormProps["onSubscribe"];
}

export function FooterCommunity({ onSubscribe }: FooterCommunityProps) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-10 sm:px-6 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">Rejoignez la communauté</h3>
        <SocialLinks />
      </div>
      <div className="w-full md:max-w-sm">
        <NewsletterForm onSubscribe={onSubscribe} />
      </div>
    </div>
  );
}
