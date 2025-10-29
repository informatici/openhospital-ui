import { FormControlLabel, Radio, TextField } from "@mui/material";
import DateField from "components/accessories/dateField/DateField";
import {
  AutocompleteFormField,
  DateFormField,
  TextFormField,
} from "components/accessories/forms";
import { LotDTO } from "generated";
import { DATETIME_FORMAT } from "libraries/consts";
import { useTranslation } from "libraries/hooks";
import { isEmpty, values } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import Button from "components/accessories/button/Button";
import { LotFormFieldProps } from "./types";

export function DischargeLotFormField({
  medical,
  wards,
  control,
}: LotFormFieldProps) {
  const { t } = useTranslation();
  const [lots, setLots] = useState<LotDTO[]>([]);

  const lotsValues = useWatch({
    control,
    name: "lots",
  });

  useEffect(() => {
    setLots(medical?.lots ?? []);

    if (control && medical?.lots) {
      control._reset({
        ...control._formValues,
        lots: medical.lots.map((lot) => ({
          code: lot.code,
          preparationDate: lot.preparationDate
            ? new Date(lot.preparationDate)
            : undefined,
          dueDate: lot.dueDate ? new Date(lot.dueDate) : undefined,
          cost: lot.cost ?? undefined,
          ward: "",
          quantity: undefined,
        })),
      });
    }

    return () => {
      setLots([]);
    };
  }, [medical]);

  return (
    <>
      {!isEmpty(lots) && (
        <span className="col-start-1 col-span-full text-lg">
          {t("pharmacy.lot.labels.existingLots")}
        </span>
      )}

      {lots.map((lot, index) => {
        const wardValue = lotsValues?.[index]?.ward;
        return (
          <Fragment key={lot.code}>
            <Controller
              name={`lots.${index}.code`}
              control={control}
              defaultValue={lot.code}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("pharmacy.lot.fields.code")}
                  disabled
                />
              )}
            />

            <Controller
              name={`lots.${index}.preparationDate`}
              control={control}
              defaultValue={
                lot.preparationDate ? new Date(lot.preparationDate) : undefined
              }
              render={({ field, fieldState }) => (
                <DateField
                  fieldName={field.name}
                  fieldValue={field.value ? field.value.toISOString() : ""}
                  isValid={!fieldState.invalid}
                  errorText={fieldState.error?.message ?? ""}
                  onChange={field.onChange}
                  format={DATETIME_FORMAT}
                  label={t("pharmacy.lot.fields.preparationDate")}
                  disabled
                />
              )}
            />

            <Controller
              name={`lots.${index}.dueDate`}
              control={control}
              defaultValue={lot.dueDate ? new Date(lot.dueDate) : undefined}
              render={({ field, fieldState }) => (
                <DateField
                  fieldName={field.name}
                  fieldValue={field.value ? field.value.toISOString() : ""}
                  isValid={!fieldState.invalid}
                  errorText={fieldState.error?.message ?? ""}
                  onChange={field.onChange}
                  format={DATETIME_FORMAT}
                  label={t("pharmacy.lot.fields.dueDate")}
                  disabled
                />
              )}
            />

            <Controller
              name={`lots.${index}.mainStoreQuantity`}
              control={control}
              defaultValue={lot.wardsTotalQuantity}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("pharmacy.lot.fields.mainStoreQuantity")}
                  disabled
                />
              )}
            />

            <AutocompleteFormField
              label={t("pharmacy.form.fields.ward")}
              control={control}
              name={`lots.${index}.ward`}
              options={
                wards?.map((ward) => ({
                  label: ward.description,
                  value: ward.code,
                })) ?? []
              }
            />
            <TextField
              value={lot.cost}
              label={t("pharmacy.lot.fields.cost")}
              name={`lots.${index}.cost`}
              disabled
            />
            {wardValue && (
              <TextFormField
                type="number"
                label={t("pharmacy.lot.fields.quantity")}
                control={control}
                name={`lots.${index}.quantity`}
              />
            )}
            <hr className="col-span-full my-2" />
          </Fragment>
        );
      })}

      {/* {!isEmpty(lots) && (
        <div className="col-start-1 col-span-full">
          <Button type="button" variant="outlined">
            {t("pharmacy.form.fields.cancel")}
          </Button>
          <Button type="submit" variant="contained">
            {t("pharmacy.form.fields.discharge")}
          </Button>
        </div>
      )} */}
    </>
  );
}
