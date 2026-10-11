import { Icon } from "@/src/components/atoms/Icon/Icon";
import { AuthTabs } from "@/src/components/molecules/AuthTabs/AuthTabs";
import { InfoCard } from "@/src/components/molecules/InfoCard/InfoCard";
import { LoginHeader } from "@/src/components/molecules/LoginHeader/LoginHeader";
import { SocialLoginButtons } from "@/src/components/molecules/SocialLoginButtons/SocialLoginButtons";
import { AuthLayout } from "@/src/components/templates/AuthLayout/AuthLayout";
import { routes } from "@/src/lib/routing/routes";

import { AuthHeroPanel } from "../AuthHeroPanel/AuthHeroPanel";
import { LoginForm } from "../LoginForm/LoginForm";

/**
 * Full login screen: the marketing visual and the form column. Purely
 * layout/composition — every piece it renders owns its own behavior.
 *
 * Desktop (≥1024px) never scrolls: the page is pinned to the viewport
 * height and every block below sizes itself with `clamp()` against `vh`,
 * with a few `@media (max-height: …)` steps that drop non-essential
 * content once even fluid sizing runs out of room. Below 1024px the left
 * panel disappears and the page goes back to a normal scrolling column.
 */
export function LoginPage() {
  return (
    <AuthLayout
      scrollBehavior="clamp"
      hero={
        <AuthHeroPanel
          variant="login"
          className="h-full min-h-0"
          title={
            <>
              <span className="block text-white">Les choses</span>
              <span className="block text-auth-accent">de chez moi.</span>
            </>
          }
          tagline="Explorez une sélection rigoureuse de produits frais, rares et locaux. L'authenticité du marché, réinventée."
          imageSrc="/login-visual.png"
          imageAlt="Un commerçant partenaire dans son épicerie, tenant une caisse de produits frais"
        />
      }
    >
      <AuthTabs />

      <LoginHeader
        eyebrow="Espace client & gourmand"
        title="Bon retour parmi nous !"
        subtitle="Saisissez vos identifiants pour retrouver vos épiceries favorites et paniers enregistrés."
      />

      <SocialLoginButtons />

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.06em] text-auth-ink-muted">
        <span aria-hidden className="h-px flex-1 bg-auth-divider" />
        <span className="flex items-center gap-2 whitespace-nowrap">
          <Icon name="sparkle" size={10} decorative />
          Ou avec votre e-mail
          <Icon name="sparkle" size={10} decorative />
        </span>
        <span aria-hidden className="h-px flex-1 bg-auth-divider" />
      </div>

      <LoginForm />

      <div className="flex flex-col gap-[clamp(8px,1.6vh,16px)]">
        <div className="[@media(max-height:720px)]:hidden">
          <InfoCard
            imageSrc="/login-info-thumbnail.jpg"
            title="Plus de 1 200 épices & trésors locaux"
            description="Retrait gratuit chez vos commerçants de quartier"
            trailingIcon="store"
          />
        </div>

        {/* Below 620px tall, the shop-registration card collapses to a one-line text link. */}
        <div className="[@media(max-height:620px)]:hidden">
          <InfoCard
            icon="store"
            title="Vous êtes une épicerie locale ?"
            description="Ouvrez votre boutique en 3 clics et recevez vos commandes"
            trailingIcon="arrow-right"
            tone="accent"
            href={routes.auth.createAccount}
          />
        </div>
        <a
          href={routes.auth.createAccount}
          className="hidden items-center justify-center gap-1.5 text-sm font-medium text-foreground underline-offset-2 hover:underline [@media(max-height:620px)]:flex"
        >
          Vous êtes une épicerie locale ? Ouvrez votre boutique
          <Icon name="arrow-right" size={14} decorative />
        </a>
      </div>
    </AuthLayout>
  );
}
