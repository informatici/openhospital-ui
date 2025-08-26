import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import { getFromFields } from "../../../../libraries/formDataHandling/functions";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import TextField from "../../textField/TextField";
import { MedicalHistoryProps } from "../types";
import "./styles.scss";

const MedicalHistoryForm: FC<MedicalHistoryProps> = ({
  fields,
  submitButtonLabel,
  resetButtonLabel,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    siblingRank: string().required(t("common.required")),
  });

  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const { setFieldValue, resetForm } = formik;

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);
  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  return (
    <>
      <div className="medicalHistoryForm">
        <h3 className="formInsertMode">
          {t("medicalHistory.physiological.title")}
        </h3>
        <form className="medicalHistoryForm__form">
          <div className="row start-sm center-xs bottom-sm">
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.siblingRank")}
                field={formik.getFieldProps("siblingRank")}
                theme="regular"
                isValid={isValid("siblingRank")}
                errorText={getErrorText("siblingRank")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.pregnancyTerm")}
                field={formik.getFieldProps("pregnancyTerm")}
                theme="regular"
                isValid={isValid("pregnancyTerm")}
                errorText={getErrorText("pregnancyTerm")}
                onBlur={formik.handleBlur}
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.vaccinationStatus")}
                field={formik.getFieldProps("vaccinationStatus")}
                theme="regular"
                isValid={isValid("vaccinationStatus")}
                errorText={getErrorText("vaccinationStatus")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.malariaProphylaxis")}
                field={formik.getFieldProps("malariaProphylaxis")}
                theme="regular"
                isValid={isValid("malariaProphylaxis")}
                errorText={getErrorText("malariaProphylaxis")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.diet")}
                field={formik.getFieldProps("diet")}
                theme="regular"
                isValid={isValid("diet")}
                errorText={getErrorText("diet")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.deworming")}
                field={formik.getFieldProps("deworming")}
                theme="regular"
                isValid={isValid("deworming")}
                errorText={getErrorText("deworming")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.psychomotorDevelopment")}
                field={formik.getFieldProps("psychomotorDevelopment")}
                theme="regular"
                isValid={isValid("psychomotorDevelopment")}
                errorText={getErrorText("psychomotorDevelopment")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.somaticGrowth")}
                field={formik.getFieldProps("somaticGrowth")}
                theme="regular"
                isValid={isValid("somaticGrowth")}
                errorText={getErrorText("somaticGrowth")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.ironSupplement")}
                field={formik.getFieldProps("ironSupplement")}
                theme="regular"
                isValid={isValid("ironSupplement")}
                errorText={getErrorText("ironSupplement")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.folicAcidSupplement")}
                field={formik.getFieldProps("folicAcidSupplement")}
                theme="regular"
                isValid={isValid("folicAcidSupplement")}
                errorText={getErrorText("folicAcidSupplement")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.vitASupplement")}
                field={formik.getFieldProps("vitASupplement")}
                theme="regular"
                isValid={isValid("vitASupplement")}
                errorText={getErrorText("vitASupplement")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.physiological.otherSupplements")}
                field={formik.getFieldProps("otherSupplements")}
                theme="regular"
                isValid={isValid("otherSupplements")}
                errorText={getErrorText("otherSupplements")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
          </div>

          <h3 className="formInsertMode">
            {t("medicalHistory.personalPathological.title")}
          </h3>
          <div className="row start-sm center-xs bottom-sm">
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.personalPathological.transfusion")}
                field={formik.getFieldProps("transfusion")}
                theme="regular"
                isValid={isValid("transfusion")}
                errorText={getErrorText("transfusion")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t(
                  "medicalHistory.personalPathological.lastTransfusionDate"
                )}
                field={formik.getFieldProps("lastTransfusionDate")}
                theme="regular"
                isValid={isValid("lastTransfusionDate")}
                errorText={getErrorText("lastTransfusionDate")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.personalPathological.sickleCell")}
                field={formik.getFieldProps("sickleCell")}
                theme="regular"
                isValid={isValid("sickleCell")}
                errorText={getErrorText("sickleCell")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.personalPathological.drugAllergy")}
                field={formik.getFieldProps("drugAllergy")}
                theme="regular"
                isValid={isValid("drugAllergy")}
                errorText={getErrorText("drugAllergy")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.personalPathological.allergyDetails")}
                field={formik.getFieldProps("allergyDetails")}
                theme="regular"
                isValid={isValid("allergyDetails")}
                errorText={getErrorText("allergyDetails")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t("medicalHistory.personalPathological.hemolysis")}
                field={formik.getFieldProps("hemolysis")}
                theme="regular"
                isValid={isValid("hemolysis")}
                errorText={getErrorText("hemolysis")}
                onBlur={formik.handleBlur}
                disabled={false}
              />
            </div>
            <div className="medicalHistoryForm__item">
              <TextField
                label={t(
                  "medicalHistory.personalPathological.otherPathologies"
                )}
                field={formik.getFieldProps("otherPathologies")}
                theme="regular"
                isValid={isValid("otherPathologies")}
                errorText={getErrorText("otherPathologies")}
                onBlur={formik.handleBlur}
                disabled={false}
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
                disabled={false}
              />
            </div>
          </div>

          <div className="medicalHistoryForm__buttonSet">
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

export default MedicalHistoryForm;
