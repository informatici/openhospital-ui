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
import { isEmpty } from "lodash";
import React, { Fragment, useCallback, useState } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { LotFormFieldProps, TFormValues } from "./types";
import Button from "components/accessories/button/Button";

export function DischargeLotFormField({
  medical,
  wards,
  control,
}: LotFormFieldProps) {
  const { t } = useTranslation();
  const [lots, setLots] = useState<LotDTO[]>(() => medical.lots ?? []);

  const handleChange = useCallback(
    (field: ControllerRenderProps<TFormValues, "lot">, lot: LotDTO) => () => {
      field.onChange(lot);
    },
    []
  );

  const isActiveNewLot = useCallback(
    (field: ControllerRenderProps<TFormValues, "lot">, lot: LotDTO) =>
      !medical.lots?.some((item) => item.code === lot.code),
    [medical]
  );

  return (
    <>
      {!isEmpty(medical.lots) && (
        <span className="col-start-1 col-span-full text-lg">
          {t("pharmacy.lot.labels.existingLots")}
        </span>
      )}
      <Controller
        control={control}
        name="lot"
        render={({ field }) => (
          <>
            {lots.map((lot) => (
              <Fragment key={lot.code}>
                <>
                  <TextField
                    value={lot.code}
                    label={t("pharmacy.lot.fields.code")}
                    name="lot.code"
                    disabled
                  />
                  <DateField
                    format={DATETIME_FORMAT}
                    fieldValue={lot.preparationDate}
                    label={t("pharmacy.lot.fields.preparationDate")}
                    fieldName="lot.preparationDate"
                    isValid={true}
                    errorText=""
                    onChange={() => {}}
                    disabled
                  />
                  <DateField
                    format={DATETIME_FORMAT}
                    fieldValue={lot.dueDate}
                    label={t("pharmacy.lot.fields.dueDate")}
                    fieldName="lot.dueDate"
                    isValid={true}
                    errorText=""
                    onChange={() => {}}
                    disabled
                  />
                  <AutocompleteFormField
                    label={t("pharmacy.form.fields.ward")}
                    control={control}
                    name="ward"
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
                    name="lot.cost"
                    disabled
                  />
                  <TextFormField
                    type="number"
                    label={t("pharmacy.lot.fields.quantity")}
                    control={control}
                    name="quantity"
                  />
                </>
              </Fragment>
            ))}
            <div className="col-start-1 col-span-full">
              <Button type="submit" variant="contained">
                {t("pharmacy.form.fields.discharge")}
              </Button>
              <Button type="button" variant="outlined">
                {t("pharmacy.form.fields.cancel")}
              </Button>
            </div>
          </>
        )}
      />
    </>
  );
}
