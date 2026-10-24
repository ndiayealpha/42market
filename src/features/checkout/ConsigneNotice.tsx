import { IconTile } from "@/src/components/atoms/IconTile/IconTile";

export interface ConsigneNoticeProps {
  storeName: string;
}

export function ConsigneNotice({ storeName }: ConsigneNoticeProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-catalog-chip p-3">
      <IconTile icon="qr-code" tone="cream" size={40} />
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground-strong">Consigne de retrait en boutique</p>
        <p className="text-xs text-muted-foreground">Présentez votre QR code au comptoir de {storeName} pour récupérer votre commande.</p>
      </div>
    </div>
  );
}
