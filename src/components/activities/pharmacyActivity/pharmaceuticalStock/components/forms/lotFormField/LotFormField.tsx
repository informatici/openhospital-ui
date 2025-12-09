import { FormControlLabel, Radio, TextField } from "@mui/material";
import DateField from "components/accessories/dateField/DateField";
import { DateFormField, TextFormField } from "components/accessories/forms";
import { parseISO } from "date-fns";
import { LotDTO } from "generated";
import { DATETIME_FORMAT } from "libraries/consts";
import { safeFormatToISO } from "libraries/formatUtils";
import { useTranslation } from "libraries/hooks";
import { isEmpty } from "lodash";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Controller,
  ControllerRenderProps,
  Path,
  useWatch,
} from "react-hook-form";
import { LotFormFieldProps } from "./types";

export function LotFormField<T extends Record<string, any>>({
  control,
  medical,
  name,
}: LotFormFieldProps<T>) {
  const { t } = useTranslation();
  const [newLot, setNewLot] = useState<LotDTO>({
    code: "LOT_00",
    preparationDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    cost: 0,
  });

  const value = useWatch({ control, name });

  const isNewLotActive = useMemo(
    () => !medical.lots?.some((lot) => lot.code === value?.code),
    [value, medical]
  );

  const handleChange = useCallback(
    (field: ControllerRenderProps<T, any>, lot: LotDTO) => () => {
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

  useEffect(() => {
    if (value && !medical.lots?.some((lot) => lot.code === value?.code)) {
      setNewLot({
        ...value,
        preparationDate: safeFormatToISO(value?.preparationDate) ?? "",
        dueDate: safeFormatToISO(value?.dueDate) ?? "",
      });
    }
  }, [value, medical]);

  return (
    <>
      <span className="col-start-1 col-span-full text-lg mb-2">
        {t("pharmacy.lot.labels.select-lot")}
      </span>
      {!isEmpty(medical.lots) && (
        <span className="col-start-1 col-span-full text-lg">
          {t("pharmacy.lot.labels.existingLots")}
        </span>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {(medical.lots ?? []).map((lot, index) => (
              <Fragment key={lot.code}>
                <FormControlLabel
                  value={lot.code}
                  checked={lot.code === field.value?.code}
                  className="col-start-1 col-span-full"
                  control={<Radio onClick={handleChange(field, lot)} />}
                  label={t("pharmacy.lot.labels.change-on-this")}
                />
                <TextField
                  value={lot.code}
                  label={t("pharmacy.lot.fields.code")}
                  name={`${name}.${index}.code`}
                  sx={{ marginTop: 1 }}
                  disabled
                />
                <DateField
                  format={DATETIME_FORMAT}
                  fieldValue={lot.preparationDate}
                  label={t("pharmacy.lot.fields.preparationDate")}
                  fieldName={`${name}.${index}.preperationDate`}
                  isValid={true}
                  errorText=""
                  onChange={() => {}}
                  disabled
                />
                <DateField
                  format={DATETIME_FORMAT}
                  fieldValue={lot.dueDate}
                  label={t("pharmacy.lot.fields.dueDate")}
                  fieldName={`${name}.${index}.dueDate`}
                  isValid={true}
                  errorText=""
                  onChange={() => {}}
                  disabled
                />
                <TextField
                  value={lot.cost}
                  label={t("pharmacy.lot.fields.cost")}
                  name={`${name}.${index}.cost`}
                  sx={{ marginTop: 1 }}
                  disabled
                />
              </Fragment>
            ))}
            <span className="col-start-1 col-span-full text-lg">
              {t("pharmacy.lot.labels.newLot")}
            </span>
            <FormControlLabel
              value={newLot.code}
              checked={newLot.code === value?.code}
              className="col-start-1 col-span-full"
              control={<Radio onClick={handleChange(field, newLot)} />}
              label={t("pharmacy.lot.labels.change-on-this")}
            />
            <TextFormField
              label={t("pharmacy.lot.fields.code")}
              control={control}
              name={`${name}.code` as Path<T>}
              disabled={!isNewLotActive}
            />
            <DateFormField
              format={DATETIME_FORMAT}
              label={t("pharmacy.lot.fields.preparationDate")}
              control={control}
              name={`${name}.preparationDate` as Path<T>}
              disabled={!isNewLotActive}
            />
            <DateFormField
              format={DATETIME_FORMAT}
              label={t("pharmacy.lot.fields.dueDate")}
              control={control}
              name={`${name}.dueDate` as Path<T>}
              disabled={!isNewLotActive}
            />
            <TextFormField
              type="number"
              label={t("pharmacy.lot.fields.cost")}
              control={control}
              name={`${name}.cost` as Path<T>}
              disabled={!isNewLotActive}
            />
          </>
        )}
      />
    </>
  );
}
