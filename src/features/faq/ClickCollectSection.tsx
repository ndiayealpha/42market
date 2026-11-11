import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";

import { ClickCollectCard } from "./ClickCollectCard";

export function ClickCollectSection() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="max-w-2xl">
        <Eyebrow className="justify-center">100% Click &amp; Collect en Épicerie</Eyebrow>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <ClickCollectCard
          badgeLabel="Prêt en 15 à 30 min"
          title="Préparation Express & Soignée"
          description="Commandez en quelques clics. L'artisan épicier prépare avec soin vos cagettes étiquetées avec les meilleurs tubercules et condiments du jour."
          bullets={["0€ de frais de retrait au comptoir", "Cagettes ventilées pour feuilles fraîches & bananes"]}
          footerLabel="Disponible dans 100% des épiceries partenaires"
        />
        <ClickCollectCard
          badgeLabel="Accueil & Convivialité"
          title="Vérification fraîcheur en Direct"
          description="Vous contrôlez ensemble vos tubercules (ignames, manioc), calibres de plantains et poissons devant vous. Un doute ? L'épicier ajuste immédiatement votre sac."
          bullets={["Remplacement instantané en cas de préférence", "Conseils culinaires et recettes sur place"]}
          footerLabel="Remise en main propre avec le sourire"
        />
        <ClickCollectCard
          tone="brown"
          badgeLabel="Bientôt Disponible"
          title="Livraison à Domicile en Préparation"
          description="Nos équipes logistiques préparent actuellement la flotte de transporteurs et utilitaires pour livrer vos sacs de 25 kg et cartons familiaux directement sur votre palier."
          bullets={["Tests pilotes en cours à Saint-Étienne", "Ouverture prochaine des tournées de quartier"]}
          footerLabel="Phase d'expérimentation logistique"
        />
      </div>
    </div>
  );
}
