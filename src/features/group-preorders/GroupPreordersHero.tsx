import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { routes } from "@/src/lib/routing/routes";

import { GroupPreorderStats } from "./GroupPreorderStats";

export interface GroupPreordersHeroProps {
  openCampaignsCount: number;
  averageDiscountPercent: number;
}

export function GroupPreordersHero({ openCampaignsCount, averageDiscountPercent }: GroupPreordersHeroProps) {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={[{ label: "Accueil", href: routes.main.home }, { label: "Précommandes Groupées & Gros Volumes" }]} />
      <Card variant="elevated" className="flex flex-col gap-4">
        <Chip tone="cream" size="sm" shape="pill" uppercase className="w-fit font-bold">
          Tarifs grossistes &amp; direct coopératives
        </Chip>
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Précommandes Groupées des Épiceries</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            Achetez en gros conditionnement (cartons de mangues mûries sur arbre, sacs de riz 25kg, cagettes d&apos;ignames) directement auprès des
            importateurs et coopératives via votre épicerie de quartier stéphanoise. Bénéficiez de{" "}
            <strong className="text-foreground-strong">25% à 40% de réduction</strong> par rapport au détail.
          </p>
        </div>
        <GroupPreorderStats openCampaignsCount={openCampaignsCount} averageDiscountPercent={averageDiscountPercent} />
      </Card>
    </div>
  );
}
