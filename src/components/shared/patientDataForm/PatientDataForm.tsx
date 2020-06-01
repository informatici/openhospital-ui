import React, { FunctionComponent } from "react";
import { TProps } from "./types";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import TextField from "../textField/TextField";
import { object, string } from "yup";
import SmallButton from "../smallButton/SmallButton";
import "./styles.scss";
import TextButton from "../textButton/TextButton";

const PatientDataForm: FunctionComponent<TProps> = ({
  initialValues,
  profilePicture,
  handleSubmit,
  submitButtonLabel,
}) => {
  const validationSchema = object({
    name: string().required("This field is required"),
    //TODO: write schema
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  return (
    <div className="patientDataForm">
      <div className="patientDataForm__profilePictureContainer">
        <img
          src={profilePicture ? profilePicture : profilePicturePlaceholder}
          alt="profilePicture"
        />
        <div className="patientDataForm__profilePictureContainer__label">
          Click to add a photo
        </div>
      </div>
      <form className="patientDataForm__form" onSubmit={() => null}>
        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("name")}
              label="Name"
              isValid={isValid("name")}
              errorText={getErrorText("name")}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("surname")}
              label="Surname"
              isValid={isValid("surname")}
              errorText={getErrorText("surname")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("taxNumber")}
              label="Tax Number"
              isValid={isValid("taxNumber")}
              errorText={getErrorText("taxNumber")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("gender")}
              label="Gender"
              isValid={isValid("gender")}
              errorText={getErrorText("gender")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("birthday")}
              label="Birthday"
              isValid={isValid("birthday")}
              errorText={getErrorText("birthday")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("address")}
              label="Address"
              isValid={isValid("address")}
              errorText={getErrorText("address")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("city")}
              label="City"
              isValid={isValid("city")}
              errorText={getErrorText("city")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("zipCode")}
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
              label="Telephone"
              isValid={isValid("telephone")}
              errorText={getErrorText("telephone")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("email")}
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
              label="Insurance"
              isValid={isValid("insurance")}
              errorText={getErrorText("insurance")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
      </form>

      <div className="patientDataForm__buttonSet">
        <div>
          <TextButton>Clear All</TextButton>
        </div>
        <div>
          <SmallButton type="submit">{submitButtonLabel}</SmallButton>
        </div>
      </div>
    </div>
  );
};

export default PatientDataForm;
