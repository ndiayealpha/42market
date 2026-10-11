import type { FlagCode } from "@/src/components/atoms/Flag/Flag";

export type RecipeDifficulty = "Facile" | "Moyen" | "Difficile";

export interface Recipe {
  id: string;
  title: string;
  /** Display names, in order — the flag shown is always the first country's. */
  countries: string[];
  flag: FlagCode;
  durationMinutes: number;
  difficulty: RecipeDifficulty;
  /** Absent → no rating pill on the card. */
  rating?: number;
  description: string;
  priceFrom: number;
  image: { src: string; alt: string };
}
