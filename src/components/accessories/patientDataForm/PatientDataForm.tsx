import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FunctionComponent, useCallback, useEffect } from "react";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import DateField from "../dateField/DateField";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
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
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const validationSchema = object({
    firstName: string().required("This field is required"),
    //TODO: write schema
  });

  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
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

  const dateFieldHandleOnBlur = useCallback(
    (e, value) => {
      setFieldValue("birthDate", value);
      handleBlur(e);
    },
    [setFieldValue, handleBlur]
  );

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
            <TextField
              field={formik.getFieldProps("sex")}
              theme="regular"
              label="Gender"
              isValid={isValid("sex")}
              errorText={getErrorText("sex")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <DateField
              fieldName="birthDate"
              theme="regular"
              label="Birthday (day/month/year)"
              isValid={isValid("birthDate")}
              errorText={getErrorText("birthDate")}
              onBlur={dateFieldHandleOnBlur}
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
            <TextField
              field={formik.getFieldProps("bloodType")}
              theme="regular"
              label="Blood Type"
              isValid={isValid("bloodType")}
              errorText={getErrorText("bloodType")}
              onBlur={formik.handleBlur}
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
            <TextField
              field={formik.getFieldProps("parentTogether")}
              theme="regular"
              label="Lives with the parents?"
              isValid={isValid("parentTogether")}
              errorText={getErrorText("parentTogether")}
              onBlur={formik.handleBlur}
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
            <TextField
              field={formik.getFieldProps("hasInsurance")}
              theme="regular"
              label="Has insurance"
              isValid={isValid("hasInsurance")}
              errorText={getErrorText("hasInsurance")}
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
            <TextButton onClick={() => formik.resetForm()}>
              Clear All
            </TextButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientDataForm;
