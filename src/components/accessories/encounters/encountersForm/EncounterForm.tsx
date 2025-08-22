import TextField from "components/accessories/textField/TextField";
import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import Button from "../../button/Button";
import "./styles.scss";
import { EncounterProps } from "./types";

const EncounterForm: FC<EncounterProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
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

  const { resetForm } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
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

            <div className="patientEncounterForm__buttonSet">
              <div className="submit_button">
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {submitButtonLabel}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EncounterForm;
