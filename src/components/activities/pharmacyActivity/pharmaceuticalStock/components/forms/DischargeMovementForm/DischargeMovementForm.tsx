import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Button from "components/accessories/button/Button";
import {
  AutocompleteFormField,
  DateFormField,
  TextFormField,
} from "components/accessories/forms";
import { MedicalDTO, MovementDTO, WardDTO } from "generated";
import { DATETIME_FORMAT } from "libraries/consts";
import { useTranslation } from "libraries/hooks";
import { useMedicals, useWards } from "libraries/hooks/api";
import { useAppDispatch } from "libraries/hooks/redux";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { getWards } from "state/ward";
import z from "zod";
import { DischargeLotFormField } from "./DischargeLotFormField";
import { LotDTOSchema, MovementDTOSchema } from "./consts";
import "./styles.scss";
import { DisChargeMovementProps, TFormValues } from "./types";

export function DischargeMovementForm({
  movement,
  onSubmit,
  onCancel,
}: DisChargeMovementProps) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const medicalFilter = useCallback(
    (medical: MedicalDTO) => !!medical.lots?.length,
    []
  );

  const {
    medicals,
    options: medicalOptions,
    selectMedical,
  } = useMedicals(medicalFilter);

  const wardFilter = useCallback((ward: WardDTO) => !!ward.pharmacy, []);

  const { wards } = useWards(wardFilter);

  const { control, handleSubmit, setValue } = useForm<TFormValues>({
    defaultValues: {
      type: "",
      quantity: 0,
      refNo: "",
      lots: [],
    },
    resolver: standardSchemaResolver(MovementDTOSchema),
  });

  const values = useWatch({
    control,
    compute: (values) => {
      return {
        ...values,
        medical: selectMedical(values.medical),
      };
    },
  });

  const handleFormSubmit = useCallback(
    (data: TFormValues) => {
      const filledLots =
        data.lots?.filter(
          (lot) => lot.ward && lot.quantity && lot.quantity > 0
        ) ?? [];

      if (isEmpty(filledLots.length)) return;

      const movements: MovementDTO[] = filledLots.map((lot) => ({
        medical: medicals.find((m) => m.code === data.medical)!,
        type: { code: "discharge", description: "Discharge", type: "-" },
        date: data.date.toISOString(),
        quantity: lot.quantity!,
        ward: wards.find((w) => w.code === lot.ward),
        lot: {
          code: lot.code,
          preparationDate: lot.preparationDate.toISOString(),
          dueDate: lot.dueDate.toISOString(),
          cost: lot.cost ?? undefined,
        },
        refNo: data.refNo,
      }));

      onSubmit?.(movements);
    },
    [onSubmit, medicals]
  );

  useEffect(() => {
    setValue(
      "lots",
      (values.medical?.lots ?? []).map((lot) => ({
        ...lot,
        preparationDate: lot.preparationDate
          ? new Date(lot.preparationDate)
          : undefined,
        dueDate: lot.dueDate ? new Date(lot.dueDate) : undefined,
        ward: "",
        quantity: undefined,
      })) as z.infer<typeof LotDTOSchema>[]
    );
  }, [values.medical, setValue]);

  useEffect(() => {
    dispatch(getWards());
  }, [dispatch]);

  return (
    <div className="dischargeMovementForm">
      <form
        className="form-grid-layout  gap-2 w-full"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <DateFormField
          format={DATETIME_FORMAT}
          label={t("pharmacy.form.fields.date")}
          control={control}
          name="date"
        />
        <div className="col-span-full">
          <AutocompleteFormField
            label={t("pharmacy.form.fields.medical")}
            control={control}
            name="medical"
            options={medicalOptions}
          />
        </div>
        <TextFormField
          type="string"
          label={t("pharmacy.form.fields.refNo")}
          control={control}
          name="refNo"
        />
        <div className="col-start-1 col-span-full"></div>
        {values.medical && (
          <DischargeLotFormField
            key={values.medical.code}
            wards={wards}
            control={control}
          />
        )}
        <div className="col-span-full flex gap-2 justify-end">
          <Button type="reset" dataCy="reset-button" onClick={onCancel}>
            {t("pharmacy.form.fields.cancel")}
          </Button>
          <Button variant="contained" dataCy="submit-button" type="submit">
            {t("pharmacy.form.fields.discharge")}
          </Button>
        </div>
      </form>
    </div>
  );
}
