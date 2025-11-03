import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  AutocompleteFormField,
  DateFormField,
  TextFormField,
} from "components/accessories/forms";
import { MovementDTO } from "generated";
import { DATETIME_FORMAT } from "libraries/consts";
import { useTranslation } from "libraries/hooks";
import { useMedicals } from "libraries/hooks/api";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MovementDTOSchema, getInitialValues } from "./consts";
import "./styles.scss";
import { DisChargeMovementProps, TFormValues } from "./types";
import { DischargeLotFormField } from "./DisChargeLotFormField";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { getWards } from "state/ward";
import Button from "components/accessories/button/Button";

export function DisChargeMovementForm({
  movement,
  onSubmit,
  onCancel,
}: DisChargeMovementProps) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { medicals, options: medicalOptions, selectMedical } = useMedicals();

  const wards = useAppSelector((state) => state.wards.allWards.data ?? []);

  const [medicalChange, setMedicalChange] = useState<boolean>(false);

  const { control, subscribe, setValue, formState, handleSubmit, resetField } =
    useForm<TFormValues>({
      defaultValues: {
        type: "",
        quantity: 0,
        refNo: "",
      },
      resolver: standardSchemaResolver(MovementDTOSchema),
    });

  const values = useWatch({
    control,
    compute: (values) => {
      return {
        ...values,
        medical: medicals.find((medical) => medical.code === values.medical),
      };
    },
  });

  // useEffect(() => {
  //   const callback = subscribe({
  //     formState: {
  //       values: true,
  //     },
  //     callback: ({ values }) => {
  //       console.log(values);
  //     },
  //   });

  //   return () => callback();
  // }, [subscribe]);

  // useEffect(() => {
  //   if (formState.isValid) {
  //     onSubmit(values as any as MovementDTO[]);
  //   }
  // }, [values]);

  const handleFormSubmit = (data: TFormValues) => {
    if (!data.lots || data.lots.length === 0) return;

    const filledLots = data.lots.filter(
      (lot) => lot.ward && lot.quantity && lot.quantity > 0
    );

    if (filledLots.length === 0) return;

    const movements: MovementDTO[] = filledLots.map((lot) => ({
      medical: medicals.find((m) => m.code === data.medical)!,
      type: { code: "discharge", description: "Discharge", type: "-" }, // adapter selon ton type réel
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
  };

  const handleMedicalChange = (e: any) => {
    setMedicalChange(true);
    resetField("lots");
  };

  useEffect(() => {
    dispatch(getWards());
  }, [dispatch]);

  return (
    <div className="dischargeMovementForm">
      <form
        className="form-grid-layout gap-2"
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
            onChange={handleMedicalChange}
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
            medical={values.medical}
            control={control}
            medicalChange={medicalChange}
          />
        )}
        <div className="col-start-1 col-span-full mt-4">
          <Button type="button" variant="outlined" onClick={onCancel}>
            {t("pharmacy.form.fields.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            {t("pharmacy.form.fields.discharge")}
          </Button>
        </div>
      </form>
    </div>
  );
}
