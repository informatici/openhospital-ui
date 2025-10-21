import DateField from "components/accessories/dateField/DateField";
import React, { ComponentProps } from "react";
import { Control, Controller, Path } from "react-hook-form";

export type DateFormFieldProps<T extends Record<string, any>> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<
  ComponentProps<typeof DateField>,
  "fieldName" | "fieldValue" | "onChange" | "errorText" | "isValid"
>;

export function DateFormField<T extends Record<string, any>>({
  name,
  control,
  ...props
}: DateFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DateField
          {...props}
          aria-invalid={fieldState.invalid}
          fieldName={field.name}
          fieldValue={
            (field.value as any) instanceof Date
              ? field.value.toISOString()
              : field.value ?? ""
          }
          disabled={props.disabled ?? field.disabled}
          onChange={field.onChange}
          errorText={fieldState.error?.message ?? ""}
          isValid={!fieldState.invalid}
        />
      )}
    />
  );
}
