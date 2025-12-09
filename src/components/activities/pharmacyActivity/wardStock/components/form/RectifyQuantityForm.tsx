import React, { FormEvent, useCallback, useMemo, useState } from "react";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Button } from "@mui/material";
import {
  AutocompleteFormField,
  TextFormField,
} from "components/accessories/forms";
import { LotFormField } from "components/activities/pharmacyActivity/pharmaceuticalStock/components/forms/lotFormField";
import { PATHS } from "consts";
import { MedicalWardDTO, MovementWardDTO } from "generated";
import { useNavigationHandler, useTranslation } from "libraries/hooks";
import { isEmpty } from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { MedicalWardDTOSchema, getInitialValues } from "./consts";
import "./styles.scss";
import { PharmaceuticalStockFormProps, TFormValues } from "./types";

function RectifyQuantityForm({
  pharmaceutical,
  onSubmit,
  loading,
}: PharmaceuticalStockFormProps) {
  const { t } = useTranslation();

  const { control, formState } = useForm<TFormValues>({
    defaultValues: getInitialValues(pharmaceutical),
    resolver: standardSchemaResolver(MedicalWardDTOSchema),
  });

  const medicalOptions = useMemo(() => {
    if (!pharmaceutical?.id?.medical) return [];
    return [
      {
        label: pharmaceutical.id.medical.description,
        value: pharmaceutical.id.medical.code,
      },
    ];
  }, [pharmaceutical]);

  const actualQty =
    (pharmaceutical?.in_quantity ?? 0) - (pharmaceutical?.out_quantity ?? 0);

  const values = useWatch({
    control,
    compute: (values) => {
      return {
        ...values,
        actualQuantity: Number(values.actualQuantity),
      };
    },
  });

  const formValues: MovementWardDTO = {
    ward: pharmaceutical!.id!.ward,
    medical: pharmaceutical?.id?.medical,
    date: new Date().toISOString(),
    description: values.reason || "",
    quantity: actualQty - values.actualQuantity,
    units: t("pharmacy.stock.ward.pieces"),
 };

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isEmpty(Object.keys(formState.errors))) {
        onSubmit?.(formValues);
      }
    },
    [formState, values, onSubmit]
  );

  const handleGoBack = useNavigationHandler(PATHS.pharmacy_ward_stock, {
    replace: true,
  });

  return (
    <div className="rectifyStockForm">
      <div className="rectifyStockForm__header">
        <span className="rectifyStockForm__stock-status">
          {t("pharmacy.stock.ward.inStock")}: {actualQty}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="rectifyStockForm__form">
        <div className="rectifyStockForm__row">
          <div className="rectifyStockForm__label">
            {t("pharmacy.stock.ward.medical")}
          </div>
          <div className="rectifyStockForm__control">
            <AutocompleteFormField
              label=""
              name="id.medical.code"
              control={control}
              options={medicalOptions}
              disabled
            />
          </div>
        </div>

        <div className="rectifyStockForm__row">
          <div className="form-grid-layout col-start-2 ">
            {pharmaceutical?.id?.medical && (
              <LotFormField
                control={control}
                medical={pharmaceutical?.id?.medical}
                name="id.lot"
              />
            )}
          </div>
        </div>
        <div className="rectifyStockForm__row">
          <div className="rectifyStockForm__label">
            {t("pharmacy.stock.ward.actualQuantity")}
          </div>
          <div className="rectifyStockForm__control">
            <TextFormField
              type="number"
              name="actualQuantity"
              label=""
              control={control}
              defaultValue={0}
              inputProps={{ min: 0 }}
              className="rectifyStockForm__actual-input"
            />
          </div>
        </div>

        <div className="rectifyStockForm__row">
          <div className="rectifyStockForm__label">
            {t("pharmacy.stock.ward.reason")}
          </div>
          <div className="rectifyStockForm__control">
            <TextFormField
              fullWidth
              name="reason"
              label=""
              control={control}
              multiline
            />
          </div>
        </div>

        <div className="col-span-full flex gap-2 justify-end">
          <Button
            type="reset"
            onClick={handleGoBack}
            disabled={loading}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {t("common.confirm")}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RectifyQuantityForm;
