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
import React, { Fragment, useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Trans } from "react-i18next";
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

  const total = useMemo(
    () =>
      lots.reduce((acc, current) => acc + (current.mainStoreQuantity ?? 0), 0),
    [lots]
  );

  return (
    <>
      <b className="col-start-1 col-span-full text-2xl">
        {t("pharmacy.lot.labels.lots")}
      </b>
      <span className="col-start-1 col-span-full text-lg mb-2">
        <Trans i18nKey="pharmacy.lot.labels.total" values={{ count: total }}>
          Total stock quantity: <b>0</b>
        </Trans>
      </span>

      {!isEmpty(lots) && (
        <span className="col-start-1 col-span-full text-lg mb-2">
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
              sx={{ marginTop: 1 }}
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
              sx={{ marginTop: 1 }}
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
