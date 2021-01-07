import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import warningIcon from "../../../assets/warning-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import DateField from "../dateField/DateField";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import SelectField from "../selectField/SelectField";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import TextField from "../textField/TextField";
import "./styles.scss";
import { TProps } from "./types";

const PatientDataForm: FunctionComponent<TProps> = ({
  fields,
  profilePicture,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const validationSchema = object({
    firstName: string().required("This field is required"),
    secondName: string().required("This field is required"),
    birthDate: string().required("This field is required"),
    sex: string().required("This field is required")
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

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const onProfilePictureChange = useCallback(
    (picture: string) => {
      setFieldValue("blobPhoto", picture);
    },
    [setFieldValue]
  );

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
    }
  }, [shouldResetForm, resetForm]);

  const dateFieldHandleOnChange = useCallback(
    (value) => {
      setFieldValue("birthDate", value);
    },
    [setFieldValue]
  );

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
  }
  return (
    <div className="patientDataForm">
      <div className="patientDataForm__profilePictureContainer">
        <ProfilePicture
          isEditable
          preLoadedPicture={profilePicture}
          onChange={onProfilePictureChange}
          shouldReset={shouldResetForm}
          resetCallback={resetFormCallback}
        />
      </div>
      <form className="patientDataForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("firstName")}
              theme="regular"
              label="Name"
              isValid={isValid("firstName")}
              errorText={getErrorText("firstName")}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("secondName")}
              theme="regular"
              label="Surname"
              isValid={isValid("secondName")}
              errorText={getErrorText("secondName")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("taxCode")}
              theme="regular"
              label="Tax Code"
              isValid={isValid("taxCode")}
              errorText={getErrorText("taxCode")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <SelectField
              fieldName="sex"
              fieldValue={formik.values.sex}
              label="Gender"
              isValid={isValid("sex")}
              errorText={getErrorText("sex")}
              onBlur={onBlurCallback("sex")}
              options={options.sex}
            />
          </div>

          <div className="patientDataForm__item">
            <DateField
              fieldName="birthDate"
              fieldValue={formik.values.birthDate}
              disableFuture={true}
              theme="regular"
              format="dd/MM/yyyy"
              label="Birthday (day/month/year)"
              onChange={dateFieldHandleOnChange}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("height")}
              theme="regular"
              label="Height"
              isValid={isValid("height")}
              errorText={getErrorText("height")}
              onBlur={formik.handleBlur}
              type="number"
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("weight")}
              theme="regular"
              label="Weight"
              isValid={isValid("weight")}
              errorText={getErrorText("weight")}
              onBlur={formik.handleBlur}
              type="number"
            />
          </div>

          <div className="patientDataForm__item">
            <SelectField
              fieldName="bloodType"
              fieldValue={formik.values.bloodType}
              label="Blood Type"
              isValid={isValid("bloodType")}
              errorText={getErrorText("bloodType")}
              onBlur={onBlurCallback("bloodType")}
              options={options.bloodType}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("mother_name")}
              theme="regular"
              label="Mother's full name"
              isValid={isValid("mother_name")}
              errorText={getErrorText("mother_name")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("father_name")}
              theme="regular"
              label="Father's full name"
              isValid={isValid("father_name")}
              errorText={getErrorText("father_name")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <SelectField
              fieldName="parentTogether"
              fieldValue={formik.values.parentTogether}
              label="Lives with the parents?"
              isValid={isValid("parentTogether")}
              errorText={getErrorText("parentTogether")}
              onBlur={onBlurCallback("parentTogether")}
              options={options.parentTogether}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("address")}
              theme="regular"
              label="Address"
              isValid={isValid("address")}
              errorText={getErrorText("address")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("city")}
              theme="regular"
              label="City"
              isValid={isValid("city")}
              errorText={getErrorText("city")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("telephone")}
              theme="regular"
              label="Telephone"
              isValid={isValid("telephone")}
              errorText={getErrorText("telephone")}
              onBlur={formik.handleBlur}
              type="tel"
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <SelectField
              fieldName="hasInsurance"
              fieldValue={formik.values.hasInsurance}
              label="Has insurance"
              isValid={isValid("hasInsurance")}
              errorText={getErrorText("hasInsurance")}
              onBlur={onBlurCallback("hasInsurance")}
              options={options.hasInsurance}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item fullWidth">
            <TextField
              field={formik.getFieldProps("note")}
              theme="regular"
              multiline={true}
              label="Note"
              isValid={isValid("note")}
              errorText={getErrorText("note")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="patientDataForm__buttonSet">
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
          handleSecondaryButtonClick={() =>
            setOpenResetConfirmation(false)
          }
        />
      </form>
    </div>
  );
};

export default PatientDataForm;
