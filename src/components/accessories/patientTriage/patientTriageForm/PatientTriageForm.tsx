import { useFormik } from "formik";
import { get, has, isEmpty } from "lodash";
import moment from "moment";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import SelectField from "../../selectField/SelectField";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { TProps } from "./types";

const PatientTriageForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  creationMode,
  shouldResetForm,
  resetFormCallback,
  submitButtonLabel,
  saveAndPrint,
  resetButtonLabel,
  printButtonLabel,
  isLoading,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    pex_date: string()
      .required(t("common.required"))
      .test({
        name: "pex_ate",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
    pex_temp: number()
      .min(30, t("common.greaterthan", { value: 30 }))
      .max(50, t("common.lessthan", { value: 50 })),
    pex_weight: number()
      .min(1, t("common.greaterthan", { value: 1 }))
      .max(200, t("common.lessthan", { value: 200 }))
      .required(t("common.required")),
    pex_height: number()
      .min(1, t("common.greaterthan", { value: 1 }))
      .max(250, t("common.lessthan", { value: 250 }))
      .required(t("common.required")),
    pex_hr: number()
      .min(1, t("common.greaterthan", { value: 1 }))
      .max(240, t("common.lessthan", { value: 240 })),
    pex_sat: number()
      .min(50, t("common.greaterthan", { value: 50 }))
      .max(100, t("common.lessthan", { value: 100 })),
    pex_hgt: number()
      .min(30, t("common.greaterthan", { value: 30 }))
      .max(600, t("common.lessthan", { value: 600 })),
    pex_diuresis: number()
      .transform((value) => (value === "" ? null : value))
      .min(1, t("common.greaterthan", { value: 1 }))
      .max(2500, t("common.lessthan", { value: 2500 })),
    pex_rr: number()
      .min(1, t("common.greaterthan", { value: 1 }))
      .max(100, t("common.lessthan", { value: 100 })),
    pex_ap_min: number()
      .min(80, t("common.greaterthan", { value: 80 }))
      .max(120, t("common.lessthan", { value: 120 }))
      .test({
        name: "pex_ap_min",
        message: t("examination.ap.lessthanmax"),
        test: function (value) {
          if (!isEmpty(value) && !isEmpty(this.parent.pex_ap_max)) {
            return this.parent.pex_ap_max >= value;
          }
          return true;
        },
      }),
    pex_ap_max: number()
      .min(80, t("common.greaterthan", { value: 80 }))
      .max(120, t("common.lessthan", { value: 120 }))
      .test({
        name: "pex_ap_max",
        message: t("examination.ap.morethanmin"),
        test: function (value) {
          if (!isEmpty(value) && !isEmpty(this.parent.pex_ap_min)) {
            return this.parent.pex_ap_min <= value;
          }
          return true;
        },
      }),
    pex_pex_body_mass_index: number(),
    pex_pex_branchial_perimeter: number()
      .min(5, t("common.greaterthan", { value: 5 }))
      .max(60, t("common.lessthan", { value: 60 })),
    pex_type: string().required(t("common.required")),
  });
  const initialValues = getFromFields(fields, "value");
  const options = getFromFields(fields, "options");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      console.log(formattedValues);
      onSubmit({
        ...formattedValues,
        pex_auscultation: isEmpty(formattedValues.pex_auscultation)
          ? null
          : formattedValues.pex_auscultation,
        pex_diuresis_desc: isEmpty(formattedValues.pex_diuresis_desc)
          ? null
          : formattedValues.pex_diuresis_desc,
        pex_bowel_desc: isEmpty(formattedValues.pex_bowel_desc)
          ? null
          : formattedValues.pex_bowel_desc,
      } as any);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;
  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [formik, setFieldValue]
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

  const formatOptions = (value: any) => {
    return (value as { label: string; value: string }[]).map((e) => ({
      label: t("examination." + e.label),
      value: e.value,
    }));
  };

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
    resetFormCallback();
  };

  const handleCalculateBMI = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    const weight = parseFloat(formik.values.pex_weight);
    const height = parseInt(formik.values.pex_height);

    if (!isNaN(weight) && !isNaN(height) && height > 0) {
      const bmi = parseFloat((weight / (height / 100) ** 2).toFixed(2));
      formik.setFieldValue("pex_body_mass_index", bmi);
    } else {
      formik.setFieldValue("pex_body_mass_index", "");
    }
  };

  const examinationTypes = [
    { id: "admission", label: t("examination.type.admission") },
    { id: "followUp", label: t("examination.type.followUp") },
  ];
  const renderOptions = (options: any[]) => {
    return options.map((option) => ({
      label: option.label,
      value: option.id,
    }));
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
        <h5 className="formInsertMode">
          {creationMode
            ? t("examination.newtriage")
            : t("examination.edittriage") +
              ": " +
              renderDate(formik.values.pex_date)}
        </h5>
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
                format="dd/MM/yyyy HH:mm"
                isValid={isValid("pex_date")}
                errorText={getErrorText("pex_date")}
                label={t("examination.datetriage")}
                onChange={dateFieldHandleOnChange("pex_date")}
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="pex_type"
                fieldValue={formik.values.pex_type}
                label={t("examination.examinationType")}
                isValid={isValid("pex_type")}
                errorText={getErrorText("pex_type")}
                onBlur={onBlurCallback("pex_type")}
                options={renderOptions(examinationTypes)}
                disabled={isLoading}
              />
            </div>
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_ipt")}
                theme="regular"
                label={t("examination.ipt")}
                isValid={isValid("pex_ipt")}
                errorText={getErrorText("pex_ipt")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_height")}
                theme="regular"
                label={t("examination.height")}
                isValid={isValid("pex_height")}
                errorText={getErrorText("pex_height")}
                onBlur={handleCalculateBMI}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_weight")}
                theme="regular"
                label={t("examination.weight")}
                isValid={isValid("pex_weight")}
                errorText={getErrorText("pex_weight")}
                onBlur={handleCalculateBMI}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_body_mass_index")}
                theme="regular"
                label={t("examination.bodymassindex")}
                isValid={isValid("pex_body_mass_index")}
                errorText={getErrorText("pex_body_mass_index")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_branchial_perimeter")}
                theme="regular"
                label={t("examination.branchialperimeter")}
                isValid={isValid("pex_branchial_perimeter")}
                errorText={getErrorText("pex_branchial_perimeter")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_temp")}
                theme="regular"
                label={t("examination.temperature")}
                isValid={isValid("pex_temp")}
                errorText={getErrorText("pex_temp")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_sat")}
                theme="regular"
                label={t("examination.saturation")}
                isValid={isValid("pex_sat")}
                errorText={getErrorText("pex_sat")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_ap_min")}
                theme="regular"
                label={t("examination.ap.min")}
                isValid={isValid("pex_ap_min")}
                errorText={getErrorText("pex_ap_min")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_ap_max")}
                theme="regular"
                label={t("examination.ap.max")}
                isValid={isValid("pex_ap_max")}
                errorText={getErrorText("pex_ap_max")}
                onBlur={formik.handleBlur}
                type="string"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_hr")}
                theme="regular"
                label={t("examination.heartrate")}
                isValid={isValid("pex_hr")}
                errorText={getErrorText("pex_hr")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_diuresis")}
                theme="regular"
                label={t("examination.diuresisvolume24h")}
                isValid={isValid("pex_diuresis")}
                errorText={getErrorText("pex_diuresis")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_rr")}
                theme="regular"
                label={t("examination.respiratoryrate")}
                isValid={isValid("pex_rr")}
                errorText={getErrorText("pex_rr")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_hgt")}
                theme="regular"
                label={t("examination.hgt")}
                isValid={isValid("pex_hgt")}
                errorText={getErrorText("pex_hgt")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <SelectField
                fieldName="pex_diuresis_desc"
                fieldValue={formik.values.pex_diuresis_desc}
                label={t("examination.diuresis")}
                isValid={isValid("pex_diuresis_desc")}
                errorText={getErrorText("pex_diuresis_desc")}
                onBlur={onBlurCallback("pex_diuresis_desc")}
                options={formatOptions(options.pex_diuresis_desc)}
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="pex_bowel_desc"
                fieldValue={formik.values.pex_bowel_desc}
                label={t("examination.bowel")}
                isValid={isValid("pex_bowel_desc")}
                errorText={getErrorText("pex_bowel_desc")}
                onBlur={onBlurCallback("pex_bowel_desc")}
                options={formatOptions(options.pex_bowel_desc)}
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="pex_auscultation"
                fieldValue={formik.values.pex_auscultation}
                label={t("examination.auscultation")}
                isValid={isValid("pex_auscultation")}
                errorText={getErrorText("pex_auscultation")}
                onBlur={onBlurCallback("pex_auscultation")}
                options={formatOptions(options.pex_auscultation)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item fullWidth">
              <TextField
                field={formik.getFieldProps("pex_note")}
                theme="regular"
                label={t("examination.note")}
                isValid={isValid("pex_note")}
                errorText={getErrorText("pex_note")}
                onBlur={formik.handleBlur}
                multiline
                disabled={isLoading}
                maxLength={65535}
              />
            </div>
          </div>

          <div className="patientTriageForm__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {submitButtonLabel}
              </Button>
            </div>
            <div className="submit_button">
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={saveAndPrint}
              >
                {printButtonLabel}
              </Button>
            </div>
            <div className="reset_button">
              <Button
                type="reset"
                variant="text"
                disabled={isLoading}
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

export default PatientTriageForm;
