import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import React from "react";
import { Control, Controller, Path } from "react-hook-form";

export type CheckboxFormFieldProps<T extends Record<string, any>> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  indeterminate?: boolean;
};

export function CheckboxFormField<T extends Record<string, any>>({
  name,
  control,
  label,
  disabled = false,
  indeterminate = false,
}: CheckboxFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CheckboxField
          fieldName={field.name}
          checked={!!field.value}
          disabled={disabled}
          label={label}
          indeterminate={indeterminate}
          onChange={(checked: boolean) => field.onChange(checked)}
        />
      )}
    />
  );
}
