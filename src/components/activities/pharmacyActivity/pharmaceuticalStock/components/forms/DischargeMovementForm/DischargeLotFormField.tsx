import { TextField } from "@mui/material";
import DateField from "components/accessories/dateField/DateField";
import {
  AutocompleteFormField,
  TextFormField,
} from "components/accessories/forms";
import { DATETIME_FORMAT } from "libraries/consts";
import { safeFormatToISO } from "libraries/formatUtils";
import { useTranslation } from "libraries/hooks";
import { useWardOptions } from "libraries/hooks/api";
import { isEmpty } from "lodash";
import React, { Fragment } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { DischargeLotFormFieldProps } from "./types";

export function DischargeLotFormField({
  wards,
  control,
}: DischargeLotFormFieldProps) {
  const { t } = useTranslation();

  const { fields: lots } = useFieldArray({ control, name: "lots" });

  const lotsValues = useWatch({
    control,
    name: "lots",
  });

  const wardOptions = useWardOptions(wards);

  return (
    <>
      {!isEmpty(lots) && (
        <span className="col-start-1 col-span-full text-lg">
          {t("pharmacy.lot.labels.existingLots")}
        </span>
      )}

      {lots?.map((lot, index) => {
        const wardValue = lotsValues?.[index]?.ward;
        return (
          <Fragment key={lot.code}>
            <TextField
              value={lot.code}
              label={t("pharmacy.lot.fields.code")}
              name={`lots.${index}.preparationDate`}
              disabled
            />

            <DateField
              format={DATETIME_FORMAT}
              fieldValue={safeFormatToISO(lot.preparationDate) ?? ""}
              label={t("pharmacy.lot.fields.preparationDate")}
              fieldName={`lots.${index}.preparationDate`}
              isValid={true}
              errorText=""
              onChange={() => {}}
              disabled
            />

            <DateField
              format={DATETIME_FORMAT}
              fieldValue={safeFormatToISO(lot.dueDate) ?? ""}
              label={t("pharmacy.lot.fields.dueDate")}
              fieldName={`lots.${index}.dueDate`}
              isValid={true}
              errorText=""
              onChange={() => {}}
              disabled
            />

            <TextFormField
              type="number"
              control={control}
              name={`lots.${index}.mainStoreQuantity`}
              label={t("pharmacy.lot.fields.mainStoreQuantity")}
              disabled
            />

            <AutocompleteFormField
              label={t("pharmacy.form.fields.ward")}
              control={control}
              name={`lots.${index}.ward`}
              options={wardOptions}
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
    </>
  );
}
