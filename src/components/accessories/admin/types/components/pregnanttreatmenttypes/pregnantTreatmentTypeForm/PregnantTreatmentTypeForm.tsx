import { ChevronLeft } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useDiscardHelpers, useResetFormHelpers } from "libraries/hooks/ui";
import { get, has } from "lodash";
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { object, string } from "yup";
import checkIcon from "../../../../../../../assets/check-icon.png";
import warningIcon from "../../../../../../../assets/warning-icon.png";
import { PATHS } from "../../../../../../../consts";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../../../libraries/formDataHandling/functions";
import {
  createPregnantTreatmentTypeReset,
  updatePregnantTreatmentTypeReset,
} from "../../../../../../../state/types/pregnantTreatment";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import TextField from "../../../../../textField/TextField";
import "./styles.scss";
import { IPregnantTreatmentTypeFormProps } from "./types";

const PregnantTreatmentTypeForm: FC<IPregnantTreatmentTypeFormProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const pregnantTreatmentTypeStore = useAppSelector(
    (state) => state.types.pregnantTreatment
  );

  const {
    openCancelConfirmation,
    handleCancelConfirmation,
    handleCancelConfirmationDialog,
  } = useDiscardHelpers();

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? pregnantTreatmentTypeStore.create.error?.message
        : pregnantTreatmentTypeStore.update.error?.message) ??
      t("common.somethingwrong"),
    [
      creationMode,
      t,
      pregnantTreatmentTypeStore.create.error?.message,
      pregnantTreatmentTypeStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues as any);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const {
    openResetConfirmation,
    handleResetConfirmation,
    handleResetConfirmationDialog,
  } = useResetFormHelpers(formik as any);

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createPregnantTreatmentTypeReset());
    } else {
      dispatch(updatePregnantTreatmentTypeReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="pregnantTreatmentTypesForm">
      <div className="form__header">
        <div className="form__actions">
          <Button
            dataCy="cancel-form"
            onClick={handleCancelConfirmationDialog(true)}
            type="button"
            variant="text"
            color="primary"
          >
            <ChevronLeft fontSize="small" />
            {t("common.discard")}
          </Button>
        </div>
      </div>
      <form
        className="pregnantTreatmentTypesForm__form"
        onSubmit={formik.handleSubmit}
      >
        <div className="row start-sm center-xs">
          <div className="pregnantTreatmentTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("pregnantTreatmentTypes.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="pregnantTreatmentTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("pregnantTreatmentTypes.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="pregnantTreatmentTypesForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              dataCy="submit-form"
              variant="contained"
              disabled={isLoading}
            >
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              dataCy="reset-form"
              type="reset"
              variant="text"
              disabled={isLoading || !formik.dirty}
              onClick={handleResetConfirmationDialog(true)}
            >
              {resetButtonLabel}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openCancelConfirmation}
          title={t("common.discard")}
          info={t("common.discardMessage")}
          icon={warningIcon}
          primaryButtonLabel={t("common.discard")}
          secondaryButtonLabel={t("common.backToEdit")}
          handlePrimaryButtonClick={handleCancelConfirmation}
          handleSecondaryButtonClick={handleCancelConfirmationDialog(false)}
        />
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={t("common.reset")}
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.reset")}
          secondaryButtonLabel={t("common.backToEdit")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={handleResetConfirmationDialog(false)}
        />
        {(creationMode
          ? pregnantTreatmentTypeStore.create.status === "FAIL"
          : pregnantTreatmentTypeStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? pregnantTreatmentTypeStore.create.hasSucceeded
              : pregnantTreatmentTypeStore.update.hasSucceeded)
          }
          title={
            creationMode
              ? t("pregnantTreatmentTypes.created")
              : t("pregnantTreatmentTypes.updated")
          }
          icon={checkIcon}
          info={
            creationMode
              ? t("pregnantTreatmentTypes.createSuccess")
              : t("pregnantTreatmentTypes.updateSuccess", {
                  code: formik.values.code,
                })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_pregnant_treatment_types, { replace: true });
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default PregnantTreatmentTypeForm;
