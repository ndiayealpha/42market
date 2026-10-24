import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { routes } from "@/src/lib/routing/routes";

export interface ProfilePageHeaderProps {
  isVerified: boolean;
  /** Anchor to the "Préférences & Sécurité" section — no dedicated preferences panel exists yet (hypothesis #4). */
  preferencesAnchor: string;
}

export function ProfilePageHeader({ isVerified, preferencesAnchor }: ProfilePageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="cream" size="sm" shape="pill" uppercase>
            Espace membre fidélité
          </Chip>
          {isVerified && <span className="text-xs text-muted-foreground">• Compte vérifié</span>}
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-foreground-strong sm:text-3xl">Espace Personnel & Profil</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Gérez vos informations, suivez vos retraits Click & Collect et personnalisez vos terroirs d&apos;approvisionnement en
          circuit court.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <ButtonLink variant="soft" href={preferencesAnchor}>
          Préférences rapides
        </ButtonLink>
        <ButtonLink variant="primary-md" href={routes.main.profileEdit}>
          Modifier mon profil
        </ButtonLink>
      </div>
    </div>
  );
}
