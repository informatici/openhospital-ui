import { FormControlLabel, Radio, TextField } from "@mui/material";
import DateField from "components/accessories/dateField/DateField";
import { DateFormField, TextFormField } from "components/accessories/forms";
import { parseISO } from "date-fns";
import { LotDTO } from "generated";
import { DATETIME_FORMAT } from "libraries/consts";
import { useTranslation } from "libraries/hooks";
import { isEmpty } from "lodash";
import React, { Fragment, useCallback, useState } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { LotFormFieldProps, TFormValues } from "./types";

export function LotFormField({ medical, control }: LotFormFieldProps) {
  const { t } = useTranslation();
  const [lots] = useState<LotDTO[]>(() => [
    ...(medical.lots ?? []),
    {
      code: "",
      preparationDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    },
  ]);

  const handleChange = useCallback(
    (field: ControllerRenderProps<TFormValues, "lot">, lot: LotDTO) => () => {
      field.onChange({
        ...lot,
        dueDate: lot.dueDate ? parseISO(lot.dueDate) : undefined,
        preparationDate: lot.preparationDate
          ? parseISO(lot.preparationDate)
          : undefined,
      });
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
                {isActiveNewLot(field, lot) && (
                  <span className="col-start-1 col-span-full text-lg">
                    {t("pharmacy.lot.labels.newLot")}
                  </span>
                )}
                <FormControlLabel
                  value={lot.code}
                  checked={
                    lot.code === field.value?.code || isActiveNewLot(field, lot)
                  }
                  className="col-start-1 col-span-full"
                  control={<Radio onClick={handleChange(field, lot)} />}
                  label={t("pharmacy.lot.labels.change-on-this")}
                />
                {isActiveNewLot(field, lot) ? (
                  <>
                    <TextFormField
                      label={t("pharmacy.lot.fields.code")}
                      control={control}
                      name="lot.code"
                    />
                    <DateFormField
                      format={DATETIME_FORMAT}
                      label={t("pharmacy.lot.fields.preparationDate")}
                      control={control}
                      name="lot.preparationDate"
                    />
                    <DateFormField
                      format={DATETIME_FORMAT}
                      label={t("pharmacy.lot.fields.dueDate")}
                      control={control}
                      name="lot.dueDate"
                    />
                    <TextFormField
                      type="number"
                      label={t("pharmacy.lot.fields.cost")}
                      control={control}
                      name="lot.cost"
                    />
                  </>
                ) : (
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
                    <TextField
                      value={lot.cost}
                      label={t("pharmacy.lot.fields.cost")}
                      name="lot.cost"
                      disabled
                    />
                  </>
                )}
              </Fragment>
            ))}
          </>
        )}
      />
    </>
  );
}
