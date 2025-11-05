import {
  AutocompleteFormField,
  TextFormField,
} from "components/accessories/forms";
import { PATHS } from "consts";
import { useTranslation } from "libraries/hooks";
import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { getInitialValues, MedicalDTOSchema } from "./consts";
import { TFormValues } from "./types";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { CheckboxFormField } from "components/accessories/forms/CheckboxFormField/CheckboxFormField";
import Button from "components/accessories/button/Button";
import { getMedicalTypes, newMedical } from "state/pharmacy";
import "./styles.scss";
import { CircularProgress } from "@mui/material";
import { useMedicalType } from "libraries/hooks/api/useMedicalType";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import successIcon from "../../../../../../../assets/check-icon.png";
import InfoBox from "components/accessories/infoBox/InfoBox";

export default function NewPharmaceuticalForm() {
  const { t } = useTranslation();
  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string>) => void;
  }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const { control, handleSubmit, reset } = useForm<TFormValues>({
    defaultValues: getInitialValues(),
    resolver: standardSchemaResolver(MedicalDTOSchema),
  });

  const {
    medicalTypes,
    options: medicalOptions,
    selectMedicalType,
  } = useMedicalType();

  const values = useWatch({
    control,
    compute: (values) => {
      return {
        ...values,
        type: medicalTypes.find((type) => type.code === values.type),
        deleted: values.deleted ? "Y" : "N",
        initialqty: 0,
        inqty: 0,
        outqty: 0,
      };
    },
  });

  const status = useAppSelector(
    (state) => state.pharmacy.getMedicalTypes.status
  );

  const newMedicalStatus = useAppSelector(
    (state) => state.pharmacy.newMedical.status
  );

  const medicalTypesError = useAppSelector(
    (state) =>
      state.pharmacy.getMedicalTypes.error?.message ||
      t("errors.somethingwrong")
  ) as string;

  const newMedicalError = useAppSelector(
    (state) =>
      state.pharmacy.newMedical.error?.message || t("errors.somethingwrong")
  ) as string;

  const addBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-new-title")]:
        PATHS.pharmacy_pharmaceutical_new,
    });
  };

  const removeBreadcrumb = () => {
    const updatedMap = { ...breadcrumbMap };
    delete updatedMap[t("pharmacy.labels.pharmaceutical-new-title")];
    setBreadcrumbMap(updatedMap);
  };

  useEffect(() => {
    addBreadcrumb();
    return () => {
      removeBreadcrumb();
    };
  }, []);

  useEffect(() => {
    dispatch(getMedicalTypes());
  }, []);

  useEffect(() => {
    if (newMedicalStatus === "SUCCESS") {
      setOpenSuccessDialog(true);
    }
  }, [newMedicalStatus]);

  const onSubmit = async (data: TFormValues) => {
    console.log(values);
    dispatch(newMedical({ medicalDTO: values }));
  };

  const handleSuccessConfirm = () => {
    setOpenSuccessDialog(false);
    navigate(PATHS.pharmacy_pharmaceutical);
  };

  const handleAddAnother = () => {
    setOpenSuccessDialog(false);
    reset();
  };

  if (status === "LOADING") {
    return (
      <div className="newPharmaceuticalForm">
        <h1>{t("pharmacy.labels.pharmaceutical-new-title")}</h1>
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div data-cy="new-pharmaceutical-form" className="newPharmaceuticalForm">
      <h1>{t("pharmacy.labels.pharmaceutical-new-title")}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div data-cy="pharmaceutical-code-field">
          <TextFormField
            type="string"
            label={t("pharmacy.form.fields.prodCode")}
            control={control}
            name="prodCode"
          />
          <div data-cy="pharmaceutical-type-field" className="col-span-full">
            <AutocompleteFormField
              label={t("pharmacy.form.fields.typeMedical")}
              control={control}
              name="type"
              options={medicalOptions}
            />
          </div>
        </div>
        <div data-cy="pharmaceutical-description-field">
          <TextFormField
            type="string"
            label={t("pharmacy.form.fields.description")}
            control={control}
            name="description"
          />
          <TextFormField
            type="number"
            label={t("pharmacy.form.fields.pcsperpck")}
            control={control}
            name="pcsperpck"
          />
          <TextFormField
            type="number"
            label={t("pharmacy.form.fields.minqty")}
            control={control}
            name="minqty"
          />
        </div>
        <CheckboxFormField
          label={t("pharmacy.form.fields.deleted")}
          control={control}
          name="deleted"
        />

        <div data-cy="pharmaceutical-button-set" className="newPharmaceuticalForm__buttonSet">
          <Button
            type="submit"
            variant="contained"
            disabled={newMedicalStatus === "LOADING"}
          >
            {newMedicalStatus === "LOADING" ? (
              <CircularProgress size={20} />
            ) : (
              t("common.submit")
            )}
          </Button>
          <Button
            type="reset"
            variant="text"
            onClick={() => navigate(PATHS.pharmacy_pharmaceutical)}
          >
            {t("common.cancel")}
          </Button>
        </div>

        {/* InfoBox avec classe personnalisée pour la taille réduite */}
        {status === "FAIL" && (
          <div className="newPharmaceuticalForm__smallInfoBox">
            <InfoBox type="error" message={medicalTypesError} />
          </div>
        )}

        {newMedicalStatus === "FAIL" && (
          <div className="newPharmaceuticalForm__smallInfoBox">
            <InfoBox type="error" message={newMedicalError} />
          </div>
        )}
      </form>

      <ConfirmationDialog
        isOpen={openSuccessDialog}
        title={t("pharmacy.labels.pharmaceutical-success")}
        info={t("pharmacy.labels.pharmaceutical-created")}
        icon={successIcon}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={handleSuccessConfirm}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
}