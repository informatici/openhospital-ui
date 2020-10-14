import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FunctionComponent, useCallback } from "react";
import { object, string } from "yup";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import TextField from "../textField/TextField";
import "./styles.scss";
import { TProps } from "./types";

const PatientDataForm: FunctionComponent<TProps> = ({
  initialValues,
  profilePicture,
  onSubmit,
  submitButtonLabel,
  isLoading,
}) => {
  const validationSchema = object({
    firstName: string().required("This field is required"),
    //TODO: write schema
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  const onProfilePictureChange = useCallback((picture: string) => {
    formik.setFieldValue("blobPhoto", [picture]);
    //TODO: it needs refactoring
    // eslint-disable-next-line
  }, []);

  return (
    <div className="patientDataForm">
      <div className="patientDataForm__profilePictureContainer">
        <ProfilePicture
          isEditable
          preLoadedPicture={profilePicture}
          onChange={onProfilePictureChange}
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
            <TextField
              field={formik.getFieldProps("birthDate")}
              theme="regular"
              label="Data of Birth"
              isValid={isValid("birthDate")}
              errorText={getErrorText("birthDate")}
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
              field={formik.getFieldProps("zipCode")}
              theme="regular"
              label="ZIP Code"
              isValid={isValid("zipCode")}
              errorText={getErrorText("zipCode")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
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
              field={formik.getFieldProps("telephone")}
              theme="regular"
              label="Telephone"
              isValid={isValid("telephone")}
              errorText={getErrorText("telephone")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("email")}
              theme="regular"
              label="Email"
              isValid={isValid("email")}
              errorText={getErrorText("email")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("insurance")}
              theme="regular"
              label="Insurance"
              isValid={isValid("insurance")}
              errorText={getErrorText("insurance")}
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
            {/* TODO: Remove profilePicture as well */}
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
