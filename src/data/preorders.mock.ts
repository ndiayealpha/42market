import type { PreorderCampaign } from "@/src/domain/preorder";

/** No sourced product photos exist — reusing existing app assets as stand-ins. */
export const PREORDER_CAMPAIGNS: PreorderCampaign[] = [
  {
    id: "mangues-kent",
    title: "Carton Mangues Kent (4.5kg)",
    image: { src: "/login-info-thumbnail.jpg", alt: "Carton Mangues Kent (4.5kg)" },
    price: 24.9,
    originalPrice: 38.0,
    milestone: { kind: "arrival", date: "2026-04-24" },
    reservedPercent: 84,
    remaining: 8,
    unit: "colis",
  },
  {
    id: "riz-brise-25kg",
    title: "Sac Riz Brisé 25kg Sénégal",
    image: { src: "/souk-des-saveurs.jpg", alt: "Sac Riz Brisé 25kg Sénégal" },
    price: 32.5,
    originalPrice: 46.0,
    milestone: { kind: "pickup", date: "2026-04-30" },
    reservedPercent: 72,
    remaining: 14,
    unit: "dispo",
  },
  {
    id: "ignames-10kg",
    title: "Carton Ignames 10kg Kponan",
    image: { src: "/login-visual.jpg", alt: "Carton Ignames 10kg Kponan" },
    price: 34.0,
    originalPrice: 49.0,
    milestone: { kind: "arrival", date: "2026-04-23" },
    reservedPercent: 92,
    remaining: 4,
    unit: "colis",
  },
  {
    id: "plantains-murs-12kg",
    title: "Caisse Plantains Mûres 12kg",
    image: { src: "/login-info-thumbnail.jpg", alt: "Caisse Plantains Mûres 12kg" },
    price: 28.0,
    originalPrice: 40.0,
    milestone: { kind: "pickup", date: "2026-04-25" },
    reservedPercent: 60,
    remaining: 20,
    unit: "colis",
  },
];
