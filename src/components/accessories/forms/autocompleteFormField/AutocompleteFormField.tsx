import { AutocompleteField } from "components/accessories/autocompleteField";
import React, { ComponentProps, useCallback } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";

export type AutocompleteFormFieldProps<T extends Record<string, any>> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<
  ComponentProps<typeof AutocompleteField>,
  "fieldName" | "fieldValue" | "onChange" | "onBlur" | "errorText" | "isValid"
>;

export function AutocompleteFormField<T extends Record<string, any>>({
  name,
  control,
  ...props
}: AutocompleteFormFieldProps<T>) {
  const handleChange = useCallback(
    (field: ControllerRenderProps<T, Path<T>>) => (_: object, value: any) => {
      field.onChange(value?.value);
    },
    []
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <AutocompleteField
          {...props}
          aria-invalid={fieldState.invalid}
          fieldName={field.name}
          fieldValue={field.value ?? ""}
          disabled={props.disabled ?? field.disabled}
          onChange={handleChange(field)}
          onBlur={field.onBlur}
          errorText={fieldState.error?.message ?? ""}
          isValid={!fieldState.invalid}
        />
      )}
    />
  );
}
