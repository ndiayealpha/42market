import { HOW_IT_WORKS_STEPS } from "./HowItWorks.constants";
import { HowItWorksStepCard } from "./HowItWorksStepCard";

export function HowItWorksSteps() {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {HOW_IT_WORKS_STEPS.map((step) => (
        <li key={step.number}>
          <HowItWorksStepCard step={step} />
        </li>
      ))}
    </ol>
  );
}
