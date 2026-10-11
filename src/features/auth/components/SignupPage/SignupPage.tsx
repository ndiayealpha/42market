"use client";

import { TextLink } from "@/src/components/atoms/Link/Link";
import { AuthTabs } from "@/src/components/molecules/AuthTabs/AuthTabs";
import { InfoCard } from "@/src/components/molecules/InfoCard/InfoCard";
import { LoginHeader } from "@/src/components/molecules/LoginHeader/LoginHeader";
import { SocialButton } from "@/src/components/molecules/SocialButton/SocialButton";
import { AuthLayout } from "@/src/components/templates/AuthLayout/AuthLayout";
import { TrustBadgesRow } from "@/src/components/organisms/TrustBadgesRow/TrustBadgesRow";
import { routes } from "@/src/lib/routing/routes";

import { AuthHeroPanel } from "../AuthHeroPanel/AuthHeroPanel";
import { SignupForm } from "../SignupForm/SignupForm";
import { useOnboardingActions } from "../../store/onboarding.store";

const SIGNUP_SOCIAL_STYLE = {
  backgroundColor: "var(--auth-input-tint)",
  color: "var(--foreground)",
  border: "none",
  borderRadius: 8,
  height: 44,
  fontSize: 15,
  fontWeight: 500,
  justifyContent: "center" as const,
};

/**
 * Full signup screen: hero panel + tabs/social/form column. Unlike the
 * login page, this one is taller than the viewport and scrolls — the
 * hero panel stays pinned via `AuthLayout`'s "sticky" scroll behavior.
 */
export function SignupPage() {
  const { skipAccount } = useOnboardingActions();

  return (
    <AuthLayout
      scrollBehavior="sticky"
      hero={
        <AuthHeroPanel
          variant="signup"
          className="h-full"
          title="Rejoignez le marché des terroirs authentiques."
          tagline="Explorez une sélection rigoureuse de produits frais, rares et locaux. L'authenticité du marché, réinventée."
          imageSrc="/signup-visual.png"
          imageAlt="Mariam, commerçante partenaire, choisissant des mangues fraîches dans son épicerie"
          testimonial={{
            quote:
              "Grâce à 42 Markets je retrouve enfin les produits de mon enfance, livrés par de vrais commerçants du quartier.",
            author: "Aïssatou D., Lyon",
          }}
        />
      }
    >
      <AuthTabs />

      <TextLink href={routes.auth.onboarding} variant="skip" onClick={() => skipAccount()} className="self-start">
        Passer l&apos;étape
      </TextLink>

      <LoginHeader
        title="Créez votre compte 42 Markets"
        subtitle={
          <>
            Rejoignez plus de <span className="font-semibold">15 000</span> gourmands qui font confiance à nos
            commerçants partenaires.
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          provider="google"
          label="Continuer avec Google"
          disabled
          title="Connexion Google bientôt disponible"
          style={SIGNUP_SOCIAL_STYLE}
        />
        <SocialButton
          provider="apple"
          label="Continuer avec Apple"
          disabled
          title="Connexion Apple bientôt disponible"
          style={SIGNUP_SOCIAL_STYLE}
        />
      </div>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.06em] text-auth-ink-muted">
        <span aria-hidden className="h-px flex-1 bg-auth-divider-strong/60" />
        <span className="whitespace-nowrap">Ou avec votre e-mail</span>
        <span aria-hidden className="h-px flex-1 bg-auth-divider-strong/60" />
      </div>

      <SignupForm />

      <InfoCard
        icon="store"
        title="Vous êtes une épicerie locale ?"
        description="Ouvrez votre boutique en 3 clics et recevez vos commandes"
        trailingIcon="arrow-right"
        tone="merchant"
        href={routes.auth.createAccount}
      />

      <p className="text-center text-xs text-auth-ink-muted">
        Déjà inscrit ? <TextLink href={routes.auth.login}>Se connecter à son compte</TextLink>
      </p>

      <span aria-hidden className="h-px w-full bg-auth-divider-strong/60" />

      <TrustBadgesRow
        items={[
          { icon: "lock", label: "Chiffrement 256-bit SSL" },
          { icon: "shield", label: "Conforme RGPD & CNIL" },
          { icon: "store", label: "Écosystème Circulaire" },
        ]}
      />
    </AuthLayout>
  );
}
