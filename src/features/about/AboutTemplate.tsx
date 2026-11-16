import { Container } from "@/src/components/layout/Container/Container";
import { JoinCta } from "@/src/features/how-it-works/JoinCta";

import { AboutHero } from "./AboutHero";
import { ChallengesSection } from "./ChallengesSection";
import { CountriesSection } from "./CountriesSection";
import { ManifestoSection } from "./ManifestoSection";

/** Pure, static page — same shape as `HowItWorksTemplate` (no fetch, no client view layer needed above this). `JoinCta` is reused as-is: the spec explicitly asks for the same two end-of-page CTAs ("Trouver une épicerie" / "Vous êtes commerçant ?") that `JoinCta` already renders on the Comment ça marche page — not duplicated here. */
export function AboutTemplate() {
  return (
    <Container className="flex flex-col gap-14 py-10">
      <AboutHero />
      <ManifestoSection />
      <ChallengesSection />
      <CountriesSection />
      <JoinCta />
    </Container>
  );
}
