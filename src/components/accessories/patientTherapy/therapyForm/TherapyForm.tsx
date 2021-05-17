import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import SmsIcon from "@material-ui/icons/Sms";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import DateField from "../../dateField/DateField";
import "./styles.scss";
import { TherapyProps } from "./types";
import SelectField from "../../selectField/SelectField";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next/*";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { object } from "yup";
import has from "lodash.has";
import get from "lodash.get";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import warningIcon from "../../../../assets/warning-icon.png";

const TherapyForm: FC<TherapyProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const validationSchema = object({
    // TODO
  });
  const { t } = useTranslation();
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

  const [notify, setNotify] = useState(false);

  const [sms, setSms] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  };
  const handleNotifyChange = useCallback(
    (value: any) => {
      setNotify(value);
    },
    [setNotify]
  );

  const handleSmsChange = useCallback(
    (value: any) => {
      setSms(value);
    },
    [setSms]
  );

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const dummyField = {
    name: "dummyName",
    isValid: false,
    errorText: "",
    field: Object({}),
    onChange: (e: ChangeEvent<any>) => console.log(e),
    onBlur: (e: ChangeEvent<any>) => console.log(e),
  };
  const optionsFreq = [
    { label: "one", value: "One" },
    { label: "two", value: "Two" },
    { label: "three", value: "Three" },
    { label: "four", value: "Four" },
  ];
  const optionsMed = [
    { label: "med1", value: "Medecine 1" },
    { label: "med2", value: "Medecine 2" },
    { label: "med3", value: "Medecine 3" },
    { label: "med4", value: "Medecone 4" },
  ];

  return (
    <>
      <div className="patientTherapyForm">
        <form
          className="patientTherapyForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item medecine">
              <SelectField
                fieldName="medical"
                fieldValue={formik.values.medicalId}
                label={t("therapy.medical")}
                isValid={isValid("medicalId")}
                errorText={getErrorText("medicalId")}
                onBlur={onBlurCallback("medicalId")}
                options={options.medecines}
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("qty")}
                theme="regular"
                label={t("therapy.qty")}
                isValid={isValid("qty")}
                errorText={getErrorText("medicalId")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="patientTherapyForm__item">
              <SelectField
                fieldName="freqInDay"
                fieldValue={formik.values.freqInDay}
                label={t("therapy.freqInDay")}
                isValid={isValid("freqInDay")}
                errorText={getErrorText("freqInDay")}
                onBlur={onBlurCallback("freqInDay")}
                options={options.frequencyInDays}
              />
            </div>

            <div className="patientTherapyForm__item">
              <span>Duration</span>
              <TextField
                field={formik.getFieldProps("days")}
                theme="regular"
                label={t("therapy.days")}
                isValid={isValid("days")}
                errorText={getErrorText("days")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("weeks")}
                theme="regular"
                label={t("therapy.weeks")}
                isValid={isValid("weeks")}
                errorText={getErrorText("weeks")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("months")}
                theme="regular"
                label={t("therapy.months")}
                isValid={isValid("months")}
                errorText={getErrorText("months")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item label-period">
              Frequency In Period:
            </div>
            <div id="frequency" className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("freqInPeriod")}
                theme="regular"
                label={t("therapy.freqInPeriod")}
                isValid={isValid("freqInPeriod")}
                errorText={getErrorText("freqInPeriod")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <DateField
                fieldName="startDate"
                fieldValue={formik.values.startDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("startDate")}
                errorText={getErrorText("startDate")}
                label={t("therapy.startDate")}
                onChange={dateFieldHandleOnChange("startDate")}
              />
            </div>
            <div className="patientTherapyForm__item">
              <DateField
                fieldName="endDate"
                fieldValue={formik.values.endDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("endDate")}
                errorText={getErrorText("endDate")}
                label={t("therapy.endDate")}
                onChange={dateFieldHandleOnChange("endDate")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <FormGroup row className="label-sms">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={notify}
                    onChange={handleNotifyChange}
                    name="notififyInt"
                  />
                }
                label={
                  <span>
                    t("therapy.sendnotification")
                    <PriorityHigh />
                  </span>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedSMS"
                    checked={sms}
                    onChange={handleSmsChange}
                  />
                }
                label={
                  <span>
                    t("therapy.sendsms")
                    <SmsIcon />
                  </span>
                }
              />
            </FormGroup>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item fullWith">
              <TextField
                multiline={true}
                theme="regular"
                type="text"
                field={formik.getFieldProps("note")}
                label={t("therapy.note")}
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="patientTherapyForm__buttonSet">
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

export default TherapyForm;
