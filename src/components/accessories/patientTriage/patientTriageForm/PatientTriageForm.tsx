import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import { object } from "yup";
import { TProps } from "./types";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import TextButton from "../../textButton/TextButton";
import SmallButton from "../../smallButton/SmallButton";
import warningIcon from "../../../../assets/warning-icon.png";
import TextField from "../../textField/TextField";
import has from "lodash.has";
import get from "lodash.get";
import SelectField from "../../selectField/SelectField";
import "./styles.scss";

const PatientTriageForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  shouldResetForm,
  resetFormCallback,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const validationSchema = object({
    // TODO
  });

  const initialValues = getFromFields(fields, "value");
  const options = getFromFields(fields, "options");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (value) => {
      setFieldValue("triageDate", value);
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
    (fieldName: string) => (
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
      <div className="patientTriageForm">
        <form
          className="patientTriageForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <DateField
                fieldName="pex_date"
                fieldValue={formik.values.pex_date}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                label="Date (day/month/year)"
                onChange={dateFieldHandleOnChange}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_height")}
                theme="regular"
                label="Height"
                isValid={isValid("pex_height")}
                errorText={getErrorText("pex_height")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_weight")}
                theme="regular"
                label="Weight"
                isValid={isValid("pex_weight")}
                errorText={getErrorText("pex_weight")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_temp")}
                theme="regular"
                label="Temperature °C"
                isValid={isValid("pex_temp")}
                errorText={getErrorText("pex_temp")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_sat")}
                theme="regular"
                label="Saturation %"
                isValid={isValid("pex_sat")}
                errorText={getErrorText("pex_sat")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item compressed">
              <TextField
                field={formik.getFieldProps("pex_pa_min")}
                theme="regular"
                label="Art.pr.(min)"
                isValid={isValid("pex_pa_min")}
                errorText={getErrorText("pex_pa_min")}
                onBlur={formik.handleBlur}
                type="string"
              />

              <TextField
                field={formik.getFieldProps("pex_pa_max")}
                theme="regular"
                label="Art.pr.(max)"
                isValid={isValid("pex_pa_max")}
                errorText={getErrorText("pex_pa_max")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_fc")}
                theme="regular"
                label="Heart rate"
                isValid={isValid("pex_fc")}
                errorText={getErrorText("pex_fc")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("diuresis_vol")}
                theme="regular"
                label="Diuresis vol 24H"
                isValid={isValid("diuresis_vol")}
                errorText={getErrorText("diuresis_vol")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("respiratory_rate")}
                theme="regular"
                label="Respiratory rate"
                isValid={isValid("respiratory_rate")}
                errorText={getErrorText("respiratory_rate")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("hgt")}
                theme="regular"
                label="HGT"
                isValid={isValid("hgt")}
                errorText={getErrorText("hgt")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <SelectField
                fieldName="diuresis"
                fieldValue={formik.values.diuresis}
                label="Diuresis"
                isValid={isValid("diuresis")}
                errorText={getErrorText("diuresis")}
                onBlur={onBlurCallback("diuresis")}
                options={options.diuresis}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="bowel"
                fieldValue={formik.values.bowel}
                label="Bowel"
                isValid={isValid("bowel")}
                errorText={getErrorText("bowel")}
                onBlur={onBlurCallback("bowel")}
                options={options.bowel}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="auscultation"
                fieldValue={formik.values.auscultation}
                label="Auscultation"
                isValid={isValid("auscultation")}
                errorText={getErrorText("auscultation")}
                onBlur={onBlurCallback("auscultation")}
                options={options.auscultation}
              />
            </div>
          </div>

          <div className="patientTriageForm__buttonSet">
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

export default PatientTriageForm;
