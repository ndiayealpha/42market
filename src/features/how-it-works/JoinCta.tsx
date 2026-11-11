import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { routes } from "@/src/lib/routing/routes";

const MENTIONS: { icon: IconName; label: string }[] = [
  { icon: "zap", label: "Inscription instantanée" },
  { icon: "check-circle", label: "Aucun engagement" },
  { icon: "heart", label: "Pensé par et pour la diaspora" },
];

export function JoinCta() {
  return (
    <BannerSurface tone="brown" className="flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-12">
      <IconTile icon="store" tone="dark" size={56} className="bg-white/10 text-white" />
      <div>
        <h2 className="text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">Prêt à retrouver les saveurs de la maison ?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/80">
          Rejoignez des milliers de familles qui cuisinent leurs plats préférés sans compromis, tout en faisant vivre les commerçants de proximité.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <ButtonLink variant="accent" href={`${routes.main.epiceries}?tri=distance`} icon={<Icon name="search" size={16} />}>
          Trouver une épicerie près de chez moi
        </ButtonLink>
        <BannerCta href={routes.auth.createAccount} icon={<Icon name="store" size={16} />}>
          Vous êtes commerçant ? Rejoignez-nous
        </BannerCta>
      </div>
      <ul className="flex flex-col items-center gap-2 text-xs text-white/70 sm:flex-row sm:gap-5">
        {MENTIONS.map((mention) => (
          <li key={mention.label} className="flex items-center gap-1.5">
            <Icon name={mention.icon} size={14} />
            {mention.label}
          </li>
        ))}
      </ul>
    </BannerSurface>
  );
}
