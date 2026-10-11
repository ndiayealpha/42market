"use client";

import { useId, type ChangeEvent } from "react";

import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";

export interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function RememberMe({ checked, onChange }: RememberMeProps) {
  const id = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);
  }

  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-auth-ink">
      <Checkbox id={id} checked={checked} onChange={handleChange} />
      Se souvenir de moi
    </label>
  );
}
