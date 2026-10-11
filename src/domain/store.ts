export type BadgeTone = "pink" | "gold" | "cream" | "orange" | "wine" | "danger" | "success";

export interface Promo {
  label: string;
  icon?: string;
  tone: BadgeTone;
}

export type StoreStatus = { kind: "open" } | { kind: "closed"; opensAt?: string };

export interface Store {
  id: string;
  href: string;
  name: string;
  image: { src: string; alt: string; fit?: "cover" | "contain" };
  rating: number;
  distanceMeters: number;
  status: StoreStatus;
  description: string;
  pickupMinutes: number;
  promo?: Promo;
}

/** "Ouvert" / "Fermé (Ouvre à {opensAt})" / "Fermé". */
export function getStatusLabel(status: StoreStatus): string {
  if (status.kind === "open") return "Ouvert";
  return status.opensAt ? `Fermé (Ouvre à ${status.opensAt})` : "Fermé";
}
