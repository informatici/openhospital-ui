import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import DateField from "components/accessories/dateField/DateField";
import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { boolean, date, number, object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
  parseDateTime,
} from "../../../../libraries/formDataHandling/functions";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { MedicalHistoryProps } from "./types";

const MedicalHistoryForm: FC<MedicalHistoryProps> = ({
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

  const [isTransfusionChecked, setIsTransfusionChecked] = useState(false);

  const validationSchema = object({
    siblingRank: string().nullable(),
    termPregnancy: string().nullable(),
    deliveryMode: string().nullable(),
    apgarScore: string().nullable(),
    birthWeight: number().nullable(),
    vaccinationState: string().nullable(),
    antiMalarialProphylaxis: string().nullable(),
    diet: string().nullable(),
    deParasitization: string().nullable(),
    psychomotorDev: string().nullable(),
    somaticGrowth: string().nullable(),
    ironSupplement: boolean().nullable(),
    folicAcidSupplement: boolean().nullable(),
    vitASupplement: boolean().nullable(),
    otherSupplements: string().nullable(),
    transfusion: boolean().nullable(),
    lastTransfusionDate: isTransfusionChecked
      ? date().required(t("common.required"))
      : date().nullable(),
    sickleCell: boolean().nullable(),
    allergyPrecision: string().nullable(),
    allergyDetails: string().nullable(),
    hemylosis: string().nullable(),
    otherPersonalPathologies: string().nullable(),
    otherFamilyPathologies: string().nullable(),
    performedAt: Yup.date().nullable().required(t("common.required")),
  });

  const initialValues = getFromFields(fields, "value");

  const [isIronSupplementChecked, setIsIronSupplementChecked] = useState(false);
  const [isFolicAcidSupplementChecked, setIsFolicAcidSupplementChecked] =
    useState(false);
  const [isVitASupplementChecked, setIsVitASupplementChecked] = useState(false);
  const [isSickleCellChecked, setIsSickleCellChecked] = useState(false);
  const [isHemolysisChecked, setIsHemolysisChecked] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      const medicalHistoryToSave: any = {
        ...formattedValues,
        ironSupplement: isIronSupplementChecked ? true : false,
        folicAcidSupplement: isFolicAcidSupplementChecked ? true : false,
        vitASupplement: isVitASupplementChecked ? true : false,
        hemylosis: isHemolysisChecked ? true : false,
        sickleCell: isSickleCellChecked ? true : false,
        transfusion: isTransfusionChecked ? true : false,
        lastTransfusionDate: isTransfusionChecked
          ? parseDateTime(values.lastTransfusionDate)
          : null,
      };
      onSubmit(medicalHistoryToSave);
      setIsIronSupplementChecked(false);
      setIsFolicAcidSupplementChecked(false);
      setIsVitASupplementChecked(false);
      setIsHemolysisChecked(false);
      setIsTransfusionChecked(false);
      setIsSickleCellChecked(false);
    },
  });

  const { setFieldValue, resetForm } = formik;
  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [formik, setFieldValue]
  );

  const handleIronSupplementChecked = () => {
    setIsIronSupplementChecked(!isIronSupplementChecked);
  };

  const handleFolicAcidSupplementChecked = () => {
    setIsFolicAcidSupplementChecked(!isFolicAcidSupplementChecked);
  };

  const handleVitASupplementChecked = () => {
    setIsVitASupplementChecked(!isVitASupplementChecked);
  };

  const handleHemolysisChecked = () => {
    setIsHemolysisChecked(!isHemolysisChecked);
  };

  const handleTransfusionChecked = () => {
    setIsTransfusionChecked(!isTransfusionChecked);
  };

  const handleSickleCellChecked = () => {
    setIsSickleCellChecked(!isSickleCellChecked);
  };

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);
  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
    setIsIronSupplementChecked(false);
    setIsFolicAcidSupplementChecked(false);
    setIsVitASupplementChecked(false);
    setIsHemolysisChecked(false);
    setIsTransfusionChecked(false);
    setIsSickleCellChecked(false);
    resetFormCallback();
  };

  useEffect(() => {
    if (!creationMode) {
      setIsIronSupplementChecked(
        formik.values.ironSupplement === "true" ? true : false
      );
      setIsFolicAcidSupplementChecked(
        formik.values.folicAcidSupplement === "true" ? true : false
      );
      setIsVitASupplementChecked(
        formik.values.vitASupplement === "true" ? true : false
      );
      setIsHemolysisChecked(formik.values.hemylosis === "true" ? true : false);
      setIsTransfusionChecked(
        formik.values.transfusion === "true" ? true : false
      );
      setIsSickleCellChecked(
        formik.values.sickleCell === "true" ? true : false
      );
    }
  }, [
    creationMode,
    formik.values.ironSupplement,
    formik.values.folicAcidSupplement,
    formik.values.vitASupplement,
    formik.values.transfusion,
    formik.values.hemylosis,
    formik.values.sickleCell,
  ]);

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  return (
    <>
      <div className="medicalHistoryForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("medicalHistory.newmedicalHistory")
            : t("medicalHistory.editmedicalHistory")}
        </h5>
        <h3 className="formInsertMode">
          {t("medicalHistory.physiological.title")}
        </h3>
        <form
          className="medicalHistoryForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs bottom-sm">
            <div className="medicalHistoryForm__item">
              <DateField
                fieldName="performedAt"
                fieldValue={formik.values.performedAt}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy HH:mm"
                isValid={isValid("performedAt")}
                errorText={getErrorText("performedAt")}
                label={t("medicalHistory.performedAt")}
                onChange={(performedAt: Date | null) =>
                  formik.setFieldValue("performedAt", performedAt)
                }
                disabled={false}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.siblingRank")}
                field={formik.getFieldProps("siblingRank")}
                theme="regular"
                isValid={isValid("siblingRank")}
                errorText={getErrorText("siblingRank")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            <h4 className="formInsertMode">
              {t("medicalHistory.physiological.pregnancyAndDelivery")}
            </h4>
            <div className="row start-sm center-xs bottom-sm">
              <div className="medicalHistoryForm__item">
                <TextField
                  label={t("medicalHistory.physiological.pregnancyTerm")}
                  field={formik.getFieldProps("termPregnancy")}
                  theme="regular"
                  isValid={isValid("termPregnancy")}
                  errorText={getErrorText("termPregnancy")}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                />
              </div>
              <div className="medicalHistoryForm__item">
                <TextField
                  label={t("medicalHistory.physiological.deliveryMode")}
                  field={formik.getFieldProps("deliveryMode")}
                  theme="regular"
                  isValid={isValid("deliveryMode")}
                  errorText={getErrorText("deliveryMode")}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                />
              </div>
              <div className="medicalHistoryForm__item">
                <TextField
                  label={t("medicalHistory.physiological.apgarScore")}
                  field={formik.getFieldProps("apgarScore")}
                  theme="regular"
                  isValid={isValid("apgarScore")}
                  errorText={getErrorText("apgarScore")}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                />
              </div>
              <div className="medicalHistoryForm__item">
                <TextField
                  label={t("medicalHistory.physiological.birthWeight")}
                  field={formik.getFieldProps("birthWeight")}
                  theme="regular"
                  isValid={isValid("birthWeight")}
                  errorText={getErrorText("birthWeight")}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.malariaProphylaxis")}
                field={formik.getFieldProps("antiMalarialProphylaxis")}
                theme="regular"
                isValid={isValid("antiMalarialProphylaxis")}
                errorText={getErrorText("antiMalarialProphylaxis")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.vaccinationStatus")}
                field={formik.getFieldProps("vaccinationState")}
                theme="regular"
                isValid={isValid("vaccinationState")}
                errorText={getErrorText("vaccinationState")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                field={formik.getFieldProps("diet")}
                theme="regular"
                label={t("medicalHistory.physiological.diet")}
                multiline={true}
                isValid={isValid("diet")}
                errorText={getErrorText("diet")}
                onBlur={formik.handleBlur}
                rows={3}
                maxLength={2000}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.deworming")}
                field={formik.getFieldProps("deParasitization")}
                theme="regular"
                isValid={isValid("deParasitization")}
                errorText={getErrorText("deParasitization")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.psychomotorDevelopment")}
                field={formik.getFieldProps("psychomotorDev")}
                theme="regular"
                isValid={isValid("psychomotorDev")}
                errorText={getErrorText("psychomotorDev")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.somaticGrowth")}
                field={formik.getFieldProps("somaticGrowth")}
                theme="regular"
                isValid={isValid("somaticGrowth")}
                errorText={getErrorText("somaticGrowth")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
          </div>
          <h4 className="formInsertMode">
            {t("medicalHistory.physiological.Supplement")}
          </h4>
          <div className="row start-sm center-xs bottom-sm">
            <div className="medicalHistoryForm__item">
              <CheckboxField
                fieldName="ironSupplement"
                label={t("medicalHistory.physiological.ironSupplement")}
                checked={isIronSupplementChecked}
                onChange={handleIronSupplementChecked}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <CheckboxField
                fieldName="folicAcidSupplement"
                label={t("medicalHistory.physiological.folicAcidSupplement")}
                checked={isFolicAcidSupplementChecked}
                onChange={handleFolicAcidSupplementChecked}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <CheckboxField
                fieldName="vitASupplement"
                label={t("medicalHistory.physiological.vitASupplement")}
                checked={isVitASupplementChecked}
                onChange={handleVitASupplementChecked}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                field={formik.getFieldProps("otherSupplements")}
                theme="regular"
                label={t("medicalHistory.physiological.otherSupplements")}
                multiline={true}
                isValid={isValid("otherSupplements")}
                errorText={getErrorText("otherSupplements")}
                onBlur={formik.handleBlur}
                rows={3}
                maxLength={2000}
                disabled={isLoading}
              />
            </div>
          </div>

          <h3 className="formInsertMode">
            {t("medicalHistory.personalPathological.title")}
          </h3>
          {isTransfusionChecked && (
            <div className="row start-sm center-xs bottom-sm">
              <div className="medicalHistoryForm__item">
                <DateField
                  fieldName="lastTransfusionDate"
                  fieldValue={formik.values.lastTransfusionDate}
                  disableFuture={true}
                  theme="regular"
                  format="dd/MM/yyyy HH:mm"
                  isValid={isValid("lastTransfusionDate")}
                  errorText={getErrorText("lastTransfusionDate")}
                  label={t(
                    "medicalHistory.personalPathological.lastTransfusionDate"
                  )}
                  onChange={dateFieldHandleOnChange("lastTransfusionDate")}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="row start-sm center-xs bottom-sm">
            <div className="medicalHistoryForm__item">
              <CheckboxField
                fieldName="transfusion"
                label={t("medicalHistory.personalPathological.transfusion")}
                checked={isTransfusionChecked}
                onChange={handleTransfusionChecked}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <CheckboxField
                fieldName="sickleCell"
                label={t("medicalHistory.personalPathological.sickleCell")}
                checked={isSickleCellChecked}
                onChange={handleSickleCellChecked}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <CheckboxField
                fieldName="hemylosis"
                label={t("medicalHistory.personalPathological.hemolysis")}
                checked={isHemolysisChecked}
                onChange={handleHemolysisChecked}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.personalPathological.drugAllergy")}
                field={formik.getFieldProps("allergyPrecision")}
                theme="regular"
                isValid={isValid("allergyPrecision")}
                errorText={getErrorText("allergyPrecision")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                field={formik.getFieldProps("otherPersonalPathologies")}
                theme="regular"
                label={t(
                  "medicalHistory.personalPathological.otherPathologies"
                )}
                multiline={true}
                isValid={isValid("otherPersonalPathologies")}
                errorText={getErrorText("otherPersonalPathologies")}
                onBlur={formik.handleBlur}
                rows={3}
                maxLength={2000}
                disabled={isLoading}
              />
            </div>
          </div>

          <h3 className="formInsertMode">
            {t("medicalHistory.familyPathological.title")}
          </h3>
          <div className="row start-sm center-xs bottom-sm">
            <div className="fullWidth medicalHistoryForm__item">
              <TextField
                field={formik.getFieldProps("otherFamilyPathologies")}
                theme="regular"
                label={t(
                  "medicalHistory.familyPathological.otherFamilyPathologies"
                )}
                multiline={true}
                isValid={isValid("otherFamilyPathologies")}
                errorText={getErrorText("otherFamilyPathologies")}
                onBlur={formik.handleBlur}
                rows={3}
                maxLength={2000}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="medicalHistoryForm__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {submitButtonLabel}
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

export default MedicalHistoryForm;
