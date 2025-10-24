import SelectField from "components/accessories/selectField/SelectField";
import React, { ComponentProps } from "react";
import { Control, Controller, Path } from "react-hook-form";

export type SelectFormFieldProps<T extends Record<string, any>> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<
  ComponentProps<typeof SelectField>,
  "fieldName" | "fieldValue" | "onChange" | "onBlur" | "errorText" | "isValid"
>;

export function SelectFormField<T extends Record<string, any>>({
  name,
  control,
  ...props
}: SelectFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectField
          {...props}
          aria-invalid={fieldState.invalid}
          fieldName={field.name}
          fieldValue={field.value ?? ""}
          disabled={props.disabled ?? field.disabled}
          onChange={field.onChange}
          onBlur={field.onBlur}
          errorText={fieldState.error?.message ?? ""}
          isValid={!fieldState.invalid}
        />
      )}
    />
  );
}
