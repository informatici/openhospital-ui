import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { object } from "yup";
import SearchIcon from "../../../assets/SearchIcon";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  searchPatient,
  getPatientSuccess,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import TextField from "../../accessories/textField/TextField";
import PatientSearchItem from "./PatientSearchItem";
import "./styles.scss";
import { IDispatchProps, IStateProps, TValues, TProps } from "./types";
import { useIsSearchById } from "./useIsSearchById";
import { T, useT } from '@transifex/react';

const SearchPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  patientSearchResults,
  searchPatient,
  searchStatus,
  getPatientSuccess,
}) => {
  const searchPatientPath = useT("Search Patient", {});
  const breadcrumbMap = {
    Dashboard: "/",
    [searchPatientPath]: "/search",
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const initialValues: TValues = {
    id: "",
    firstName: "",
    secondName: "",
    birthDate: "",
    address: "",
  };

  const validationSchema = object({
    //TODO: write schema
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: TValues) => {
      // First scroll to show searching message
      scrollToElement(resultsRef.current);
      searchPatient(values);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  useEffect(() => {
    if (searchStatus === "SUCCESS" || searchStatus === "SUCCESS_EMPTY") {
      // Second scroll to show results
      scrollToElement(resultsRef.current);
    }
  }, [searchStatus]);

  const isSearchById = useIsSearchById(formik);

  const warningLabel = "We couldn't find a match, please try another search.";
  const errorLabel = "Something went wrong, please retry.";

  const renderSearchResults = (): JSX.Element | undefined => {
    switch (searchStatus) {
      case "IDLE":
        return;

      case "LOADING":
        return <h3 className="searchPatient__loading"><T _str="Searching" /></h3>;

      case "SUCCESS":
        return (
          <div className="searchPatient__results">
            <div className="searchPatient__results_count">
            <T _str="Results" />: <strong>{patientSearchResults?.length}</strong>
            </div>
            <div className="searchPatient__results_list">
              {patientSearchResults?.map((patient, index) => (
                <PatientSearchItem
                  key={index}
                  patient={patient}
                  getPatientSuccessCallback={getPatientSuccess}
                />
              ))}
            </div>
          </div>
        );

      case "SUCCESS_EMPTY":
        return (
          <InfoBox
            type="warning"
            message={warningLabel}
          />
        );

      default:
        return (
          <InfoBox type="error" message={errorLabel} />
        );
    }
  };

  return (
    <div className="searchPatient">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="searchPatient__background">
        <div className="container">
          <div className="searchPatient__title"><T _str="Search Patient" /></div>
          <form className="searchPatient__panel" onSubmit={formik.handleSubmit}>
            <div className="searchPatient__primary">
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    theme="light"
                    field={formik.getFieldProps("id")}
                    label={useT("Patient ID", {})}
                    isValid={isValid("id")}
                    errorText={getErrorText("id")}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className="searchPatient__buttonContainer">
              <Button
                className="searchPatient__button"
                type="submit"
                disabled={searchStatus === "LOADING"}
              >
                <SearchIcon width="20" height="20" />
                <div className="searchPatient__button__label"><T _str="Search" /></div>
              </Button>
            </div>
            <div className="searchPatient__secondary">
              <div className="searchPatient__info">
                <T _str="If you don't have the patient ID, fill as many fields as possible and click search" />
              </div>
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("firstName")}
                    theme="regular"
                    label={useT("Name", {})}
                    isValid={isValid("firstName")}
                    errorText={getErrorText("firstName")}
                    onBlur={formik.handleBlur}
                    disabled={isSearchById}
                  />
                </div>
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("secondName")}
                    theme="regular"
                    label={useT("Surname", {})}
                    isValid={isValid("secondName")}
                    errorText={getErrorText("secondName")}
                    onBlur={formik.handleBlur}
                    disabled={isSearchById}
                  />
                </div>
              </div>
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("birthDate")}
                    theme="regular"
                    label={useT("Birthday", {})}
                    isValid={isValid("birthDate")}
                    errorText={getErrorText("birthDate")}
                    onBlur={formik.handleBlur}
                    disabled={isSearchById}
                  />
                </div>
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("address")}
                    theme="regular"
                    label={useT("Address", {})}
                    isValid={isValid("address")}
                    errorText={getErrorText("address")}
                    onBlur={formik.handleBlur}
                    disabled={isSearchById}
                  />
                </div>
              </div>
            </div>
          </form>
          <div ref={resultsRef}>{renderSearchResults()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  patientSearchResults: state.patients.searchResults.data,
  searchStatus: state.patients.searchResults.status || "IDLE",
});

const mapDispatchToProps: IDispatchProps = {
  searchPatient,
  getPatientSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPatientActivity);
