import TextField from "components/accessories/textField/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { get, has } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import warningIcon from "../../../../assets/warning-icon.png";
import Button from "../../button/Button";
import "./styles.scss";
import { EncounterProps } from "./types";
import DateField from "components/accessories/dateField/DateField";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";

const EncounterForm: FC<EncounterProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    performedAt: Yup.date().nullable().required(t("common.required")),
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
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);
  const { resetForm } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };
  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    resetForm();
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <>
      <div className="patientEncounterForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("encounter.newencounter")
            : t("encounter.editencounter")}
        </h5>
        <form
          className="patientEncounterForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientEncounterForm__item">
              <DateField
                fieldName="performedAt"
                fieldValue={formik.values.performedAt}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy HH:mm"
                isValid={isValid("performedAt")}
                errorText={getErrorText("performedAt")}
                label={t("encounter.createddate")}
                onChange={(performedAt: Date | null) =>
                  formik.setFieldValue("performedAt", performedAt)
                }
                disabled={false}
              />
            </div>
            <div className="patientEncounterForm__item">
              <TextField
                field={formik.getFieldProps("code")}
                theme="regular"
                label={t("encounter.code")}
                isValid={isValid("code")}
                errorText={getErrorText("code")}
                onBlur={formik.handleBlur}
                type="text"
                disabled={isLoading}
                maxLength={50}
              />
            </div>
          </div>
          <div className="patientEncounterForm__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={false}>
                {submitButtonLabel}
              </Button>
            </div>
            <div className="reset_button">
              <Button
                type="reset"
                variant="text"
                disabled={false}
                onClick={() => setOpenResetConfirmation(true)}
              >
                {resetButtonLabel}
              </Button>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={resetButtonLabel.toUpperCase()}
            info={t("common.resetform")}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel={t("common.discard")}
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default EncounterForm;
