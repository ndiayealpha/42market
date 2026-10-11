"use client";

import { forwardRef, useState } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { PasswordVisibilityButton } from "@/src/components/atoms/PasswordVisibilityButton/PasswordVisibilityButton";
import { FormField, type FormFieldProps } from "@/src/components/molecules/FormField/FormField";

export type PasswordFieldProps = Omit<FormFieldProps, "type" | "icon" | "endAdornment">;

/** FormField pre-configured for a password: masked by default, with a show/hide toggle. */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      ref={ref}
      placeholder="••••••••••••"
      {...props}
      type={visible ? "text" : "password"}
      icon={<Icon name="lock" decorative />}
      endAdornment={<PasswordVisibilityButton visible={visible} onToggle={() => setVisible((v) => !v)} />}
    />
  );
});
