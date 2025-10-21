import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  AutocompleteFormField,
  DateFormField,
} from "components/accessories/forms";
import { useTranslation } from "libraries/hooks";
import { useMedicals } from "libraries/hooks/api";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MovementDTOSchema, getInitialValues } from "./consts";
import "./styles.scss";
import { ChargeMovementProps, TFormValues } from "./types";

export function ChargeMovementForm({ movement }: ChargeMovementProps) {
  const { t } = useTranslation();
  const { control, subscribe } = useForm<TFormValues>({
    defaultValues: getInitialValues(movement),
    resolver: standardSchemaResolver(MovementDTOSchema),
  });

  const { medicals, options: medicalOptions, selectMedical } = useMedicals();

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values);
      },
    });

    return () => callback();
  }, [subscribe]);

  return (
    <div className="chargeMovementForm">
      <form className="form-grid-layout">
        <DateFormField
          format="dd/MM/yyyy HH:mm"
          label={t("pharmacy.form.fields.date")}
          control={control}
          name="date"
        />
        <div className="col-start-1 col-span-full"></div>
        <div className="col-span-full">
          <AutocompleteFormField
            label={t("pharmacy.form.fields.medical")}
            control={control}
            name="medical"
            options={medicalOptions}
          />
        </div>
      </form>
    </div>
  );
}
