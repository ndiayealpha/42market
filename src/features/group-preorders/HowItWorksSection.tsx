import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";

const STEPS: { title: string; description: string }[] = [
  {
    title: "Choisissez votre campagne",
    description:
      "Sélectionnez les cartons, sacs ou cagettes lancés par vos commerçants de quartier selon vos besoins culinaires et événements.",
  },
  {
    title: "Bloquez votre tarif grossiste",
    description:
      "Aucun débit bancaire immédiat. Votre carte est validée, mais prélevée uniquement lorsque la jauge minimale est atteinte avant la date limite.",
  },
  {
    title: "Retirez en Click & Collect",
    description: "Recevez une alerte e-mail dès la livraison et le contrôle qualité dans votre boutique partenaire. Retrait gratuit et immédiat au comptoir.",
  },
];

/** The 3 numbered steps — a plain section, not `layout/Section`, since its header is centered prose rather than the usual left-aligned title row. */
export function HowItWorksSection() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="max-w-2xl">
        <Eyebrow className="justify-center">Processus coopératif transparent</Eyebrow>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Comment fonctionnent les précommandes groupées ?
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          En unissant les commandes des familles stéphanoises avec les épiceries locales, nous obtenons les mêmes tarifs que les grossistes de
          Rungis et de Marseille.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex flex-col items-center gap-3 rounded-2xl bg-surface-subtle p-6 text-left sm:text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground-strong text-sm font-extrabold text-white">
              {index + 1}
            </span>
            <p className="text-base font-bold text-foreground-strong">{step.title}</p>
            <p className="text-sm text-ink-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
