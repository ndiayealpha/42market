"use client";

import { NewsletterForm } from "@/src/components/molecules/NewsletterForm/NewsletterForm";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { useToast } from "@/src/providers/toast-provider";

/** No newsletter backend exists — `onSubscribe` resolves after a short delay and shows a toast, same honesty level as `NewsletterForm`'s own documented "renders and can be wired to a real API later" contract. */
export function NewsletterCta() {
  const toast = useToast();

  return (
    <BannerSurface tone="brown" className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Chip tone="cream" size="sm" shape="pill" uppercase className="w-fit font-bold">
          Édition du dimanche matin
        </Chip>
        <h2 className="mt-2 text-lg font-extrabold sm:text-xl">La Lettre du Terroir dans votre boîte mail</h2>
        <p className="mt-1 max-w-md text-sm text-white/80">
          Recevez chaque dimanche une recette rare, un portrait d&apos;artisan passionné et les arrivages exclusifs d&apos;épices fraîches chez les
          épiceries de votre quartier.
        </p>
      </div>
      <div className="w-full sm:max-w-sm">
        <NewsletterForm
          onSubscribe={async () => {
            await new Promise((resolve) => setTimeout(resolve, 400));
            toast.show("Inscription à la Lettre du Terroir confirmée.", "success");
          }}
          inputWrapperClassName="min-w-0 flex-1 rounded-full bg-white px-4 py-2"
          buttonStyle={{ backgroundColor: "var(--color-catalog-badge-cream)", color: "var(--color-foreground-strong)" }}
        />
      </div>
    </BannerSurface>
  );
}
