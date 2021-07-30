import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { object } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { IState } from "../../../../types";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import SelectField from "../../selectField/SelectField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { ExamProps } from "./types";

const ExamForm: FC<ExamProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    //TODO
  });

  const initialValues = getFromFields(fields, "value");
  const options = getFromFields(fields, "options");

  const medicalOptionsSelector = (state: IState) => {
    if (state.laboratories.materials.data) {
      return state.laboratories.materials.data.map((item) => {
        return {
          value: item + "",
          label: item + "",
        };
      });
    } else return [];
  };
  const materials = useSelector((state: IState) =>
    medicalOptionsSelector(state)
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues, []);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <>
      <div className="patientExamForm">
        <form className="patientExamForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientExamForm__item">
              <DateField
                fieldName="date"
                fieldValue={formik.values.date}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("date")}
                errorText={getErrorText("date")}
                label={t("lab.date")}
                onChange={dateFieldHandleOnChange("date")}
              />
            </div>
            <div className="patientExamForm__item">
              <SelectField
                fieldName="exam"
                fieldValue={formik.values.exam}
                label={t("lab.exam")}
                isValid={isValid("exam")}
                errorText={getErrorText("exam")}
                onBlur={onBlurCallback("exam")}
                options={options.exam}
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="patientExamForm__item">
              <SelectField
                fieldName="material"
                fieldValue={formik.values.material}
                label={t("lab.material")}
                isValid={isValid("material")}
                errorText={getErrorText("material")}
                onBlur={onBlurCallback("material")}
                options={materials}
              />
            </div>
            <div className="patientExamForm__item">
              <SelectField
                fieldName="result"
                fieldValue={formik.values.result}
                label={t("lab.result")}
                isValid={isValid("result")}
                errorText={getErrorText("result")}
                onBlur={onBlurCallback("result")}
                options={options.result}
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="fullWidth patientExamForm__item">
              <TextField
                multiline={true}
                field={formik.getFieldProps("note")}
                theme="regular"
                label={t("lab.note")}
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>
          </div>
          <div className="patientExamForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit" disabled={isLoading}>
                {submitButtonLabel}
              </SmallButton>
            </div>
            <div className="reset_button">
              <TextButton onClick={() => setOpenResetConfirmation(true)}>
                {resetButtonLabel}
              </TextButton>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={resetButtonLabel.toUpperCase()}
            info={`Are you sure to ${resetButtonLabel} the Form?`}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel="Dismiss"
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default ExamForm;
