import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Button from "components/accessories/button/Button";
import {
  AutocompleteFormField,
  DateFormField,
  TextFormField,
} from "components/accessories/forms";
import { PATHS } from "consts";
import { MovementDTO } from "generated";
import { DATETIME_FORMAT } from "libraries/consts";
import { safeFormatToISO } from "libraries/formatUtils";
import { useNavigationHandler, useTranslation } from "libraries/hooks";
import { useMedicals, useMovementTypes } from "libraries/hooks/api";
import { isEmpty } from "lodash";
import React, { FormEvent, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { LotFormField } from "./LotFormField";
import { MovementDTOSchema, getInitialValues } from "./consts";
import "./styles.scss";
import { ChargeMovementProps, TFormValues } from "./types";

export function ChargeMovementForm({
  movement,
  onSubmit,
  loading,
}: ChargeMovementProps) {
  const { t } = useTranslation();

  const { options: medicalOptions, selectMedical } = useMedicals();
  const { selectMovementType } = useMovementTypes();

  const { control, watch, formState } = useForm<TFormValues>({
    defaultValues: getInitialValues(movement),
    resolver: standardSchemaResolver(MovementDTOSchema),
  });

  const values = watch();

  const formatedValues = useMemo(() => {
    return {
      ...values,
      date: safeFormatToISO(values.date),
      lot: values.lot
        ? {
            ...values.lot,
            dueDate: safeFormatToISO(values.lot?.dueDate),
            preparationDate: safeFormatToISO(values.lot?.preparationDate),
          }
        : undefined,
      medical: selectMedical(values.medical),
      type: selectMovementType(values.type),
      ward: undefined,
    };
  }, [values, selectMedical, selectMovementType]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isEmpty(Object.keys(formState.errors))) {
        onSubmit?.(formatedValues as MovementDTO);
      }
    },
    [formState, formatedValues, onSubmit]
  );

  const handleGoBack = useNavigationHandler(
    PATHS.pharmacy_pharmaceuticalstock,
    {
      replace: true,
    }
  );

  return (
    <div className="chargeMovementForm">
      <form className="form-grid-layout gap-2 w-full" onSubmit={handleSubmit}>
        <DateFormField
          format={DATETIME_FORMAT}
          label={t("pharmacy.form.fields.date")}
          control={control}
          name="date"
        />
        <AutocompleteFormField
          label={t("pharmacy.form.fields.medical")}
          control={control}
          name="medical"
          options={medicalOptions}
          className="col-start-1"
        />
        <TextFormField
          type="number"
          label={t("pharmacy.form.fields.quantity")}
          control={control}
          name="quantity"
          className="col-start-1"
        />
        <TextFormField
          type="number"
          label={t("pharmacy.form.fields.refNo")}
          control={control}
          name="refNo"
        />
        <div className="col-start-1 col-span-full"></div>
        {formatedValues.medical && (
          <LotFormField medical={formatedValues.medical} control={control} />
        )}
        <div className="col-start-1 col-span-full"></div>
        <div className="col-span-full flex gap-2 justify-end">
          <Button
            type="reset"
            dataCy="reset-button"
            onClick={handleGoBack}
            disabled={loading}
          >
            {t("common.close")}
          </Button>
          <Button
            variant="contained"
            dataCy="submit-button"
            type="submit"
            disabled={loading}
          >
            {t("pharmacy.stock.charge")}
          </Button>
        </div>
      </form>
    </div>
  );
}
