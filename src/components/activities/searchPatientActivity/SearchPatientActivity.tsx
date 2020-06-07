import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";
import AppHeader from "../../shared/appHeader/AppHeader";
import Footer from "../../shared/footer/Footer";
import "./styles.scss";
import { object, string } from "yup";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";
import TextField from "../../shared/textField/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "../../../assets/SearchIcon";
import PatientSearchItem from "./PatientSearchItem";

const SearchPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "Search Patient": "/search",
  };

  const initialValues = {
    id: "",
    taxNumber: "",
    name: "",
    surname: "",
    birthday: "",
    address: "",
  };

  const validationSchema = object({
    id: string().required("This field is required"),
    //TODO: write schema
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      //TODO: implement onSubmit event
      console.log("submit");
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  return (
    <div className="searchPatient">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="searchPatient__background">
        <div className="container">
          <div className="searchPatient__title">Search Patient</div>
          <div className="searchPatient__panel">
            <div className="searchPatient__primary">
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    theme="light"
                    field={formik.getFieldProps("id")}
                    label="Patient ID"
                    isValid={isValid("id")}
                    errorText={getErrorText("id")}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <span className="searchPatient__primary__divider">OR</span>
                <div className="searchPatient__formItem">
                  <TextField
                    theme="light"
                    field={formik.getFieldProps("taxNumber")}
                    label="Tax Number"
                    isValid={isValid("taxNumber")}
                    errorText={getErrorText("taxNumber")}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className="searchPatient__buttonContainer">
              <Button className="searchPatient__button" type="submit">
                <SearchIcon width="20" height="20" />
                <div className="searchPatient__button__label">Search</div>
              </Button>
            </div>
            <div className="searchPatient__secondary">
              <div className="searchPatient__info">
                If you don't have the patient ID or the tax number, fill as many
                fields as possible and click search
              </div>
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("name")}
                    theme="regular"
                    label="Name"
                    isValid={isValid("name")}
                    errorText={getErrorText("name")}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("surname")}
                    theme="regular"
                    label="Surname"
                    isValid={isValid("surname")}
                    errorText={getErrorText("surname")}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("birthday")}
                    theme="regular"
                    label="Birthday"
                    isValid={isValid("birthday")}
                    errorText={getErrorText("birthday")}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("address")}
                    theme="regular"
                    label="Address"
                    isValid={isValid("address")}
                    errorText={getErrorText("address")}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="searchPatient__results">
            <PatientSearchItem patient={{ id: 12345 }} />
            <PatientSearchItem patient={{ id: 12345 }} />
            <PatientSearchItem patient={{ id: 12345 }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(SearchPatientActivity);
