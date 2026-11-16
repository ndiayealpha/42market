"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";
import { FileUpload } from "@/src/components/atoms/FileUpload/FileUpload";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { FormField } from "@/src/components/molecules/FormField/FormField";
import {
  hasMerchantApplicationErrors,
  MERCHANT_SERVICE_LABELS,
  MERCHANT_SPECIALTY_LABELS,
  validateMerchantApplication,
  type MerchantApplicationErrors,
  type MerchantPlan,
  type MerchantService,
  type MerchantSpecialty,
} from "@/src/domain/merchant";
import { useSubmitMerchantApplication } from "@/src/hooks/useSubmitMerchantApplication";

const KBIS_ACCEPT = "application/pdf,image/jpeg,image/png";
const KBIS_MAX_SIZE_BYTES = 10 * 1024 * 1024;

function toggleInSet<T>(set: ReadonlySet<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export interface MerchantApplicationFormProps {
  /** Preselected from the pricing section above — the plan the "Commencer gratuitement" / "Passer au Pro" / "Passer au Business" buttons scrolled here for. */
  selectedPlan: MerchantPlan;
}

export function MerchantApplicationForm({ selectedPlan }: MerchantApplicationFormProps) {
  const [managerName, setManagerName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [siret, setSiret] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialties, setSpecialties] = useState<Set<MerchantSpecialty>>(new Set());
  const [services, setServices] = useState<Set<MerchantService>>(new Set());
  const [estimatedReferenceCount, setEstimatedReferenceCount] = useState("");
  const [kbisFile, setKbisFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<MerchantApplicationErrors>({});
  const submitApplication = useSubmitMerchantApplication();

  function handleSubmit() {
    const input = {
      managerName,
      storeName,
      siret,
      address,
      city,
      postalCode,
      phone,
      email,
      specialties: Array.from(specialties),
      services: Array.from(services),
      estimatedReferenceCount: Number(estimatedReferenceCount) || 0,
      plan: selectedPlan,
      kbisFileName: kbisFile?.name ?? "",
    };
    const nextErrors = validateMerchantApplication(input);
    setErrors(nextErrors);
    if (hasMerchantApplicationErrors(nextErrors)) return;

    submitApplication.mutate(input);
  }

  if (submitApplication.isSuccess) {
    return (
      <div id="formulaire" className="scroll-mt-24 flex flex-col items-center gap-3 rounded-2xl bg-surface px-6 py-10 text-center shadow-card">
        <Icon name="check-circle" size={32} className="text-success" decorative />
        <p className="text-lg font-bold text-foreground-strong">Demande d&apos;adhésion transmise !</p>
        <p className="max-w-sm text-sm text-ink-muted">
          Merci {managerName || ""}. Notre équipe vous recontacte sous 24h par téléphone ou email pour finaliser l&apos;activation de{" "}
          {storeName || "votre épicerie"}.
        </p>
      </div>
    );
  }

  return (
    <form
      id="formulaire"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      noValidate
      className="scroll-mt-24 flex flex-col gap-6 rounded-2xl bg-surface p-6 shadow-card sm:p-8"
    >
      <div>
        <p className="text-[13px] font-bold uppercase text-ink-muted">Demande d&apos;adhésion commerçant</p>
        <h2 className="mt-1 text-xl font-extrabold text-foreground-strong sm:text-2xl">Ouvrir ma boutique 42 Markets</h2>
        <p className="mt-1 text-sm text-ink-muted">Remplissez ce formulaire court pour être contacté sous 24h par votre responsable de secteur dédié.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nom & Prénom du gérant" placeholder="Ex: Amadou Diallo" value={managerName} onChange={(e) => setManagerName(e.target.value)} error={errors.managerName} />
        <FormField label="Nom de l'épicerie / Enseigne" placeholder="Ex: Loirivoire Marché Exotique" value={storeName} onChange={(e) => setStoreName(e.target.value)} error={errors.storeName} />
        <FormField label="Numéro SIRET (14 chiffres)" placeholder="Ex: 89412345600012" inputMode="numeric" value={siret} onChange={(e) => setSiret(e.target.value)} error={errors.siret} />
        <FormField label="Adresse complète du magasin" placeholder="Ex: 14 rue du Général Leclerc" value={address} onChange={(e) => setAddress(e.target.value)} error={errors.address} />
        <FormField label="Ville" placeholder="Ex: Saint-Étienne" value={city} onChange={(e) => setCity(e.target.value)} error={errors.city} />
        <FormField label="Code Postal" placeholder="42000" inputMode="numeric" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} error={errors.postalCode} />
        <FormField label="Téléphone (WhatsApp / SMS)" type="tel" placeholder="06 12 34 56 78" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
        <FormField label="Email professionnel" type="email" placeholder="contact@mon-epicerie.fr" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-foreground">Spécialités de votre étal</legend>
          {Object.entries(MERCHANT_SPECIALTY_LABELS).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-sm text-foreground-strong">
              <Checkbox checked={specialties.has(value as MerchantSpecialty)} onChange={() => setSpecialties((current) => toggleInSet(current, value as MerchantSpecialty))} />
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-foreground">Services annexes au comptoir</legend>
          {Object.entries(MERCHANT_SERVICE_LABELS).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-sm text-foreground-strong">
              <Checkbox checked={services.has(value as MerchantService)} onChange={() => setServices((current) => toggleInSet(current, value as MerchantService))} />
              {label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Nombre estimé de références en rayon"
          placeholder="Ex: 300 (Magasin de proximité complet)"
          inputMode="numeric"
          value={estimatedReferenceCount}
          onChange={(e) => setEstimatedReferenceCount(e.target.value)}
        />
        <FileUpload
          label="Extrait Kbis ou attestation INSEE (< 3 mois)"
          accept={KBIS_ACCEPT}
          hint="PDF, JPEG, PNG (moins de 10 Mo)"
          maxSizeBytes={KBIS_MAX_SIZE_BYTES}
          file={kbisFile}
          onChange={setKbisFile}
          error={errors.kbisFileName}
        />
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-catalog-line pt-5">
        <Button variant="primary-lg" type="submit" disabled={submitApplication.isPending} className="w-full sm:w-auto">
          {submitApplication.isPending ? "Envoi…" : "Transmettre ma demande d'adhésion complète"}
        </Button>
        <p className="text-center text-xs text-ink-muted">Conforme RGPD &amp; contrôle DGCCRF garantis. Vos données d&apos;entreprise restent protégées.</p>
        {submitApplication.isError && <p role="alert" className="text-sm text-danger">Une erreur est survenue. Réessayez dans un instant.</p>}
      </div>
    </form>
  );
}
