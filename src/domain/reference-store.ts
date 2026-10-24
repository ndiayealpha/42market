export interface ReferenceStore {
  name: string;
  address: string;
  /** Today's Click & Collect pickup window — fed to `formatPickupWindow`. */
  pickupStartIso: string;
  pickupEndIso: string;
}
