import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { object, string } from "yup";
import SearchIcon from "../../../assets/SearchIcon";
import { PATHS } from "../../../consts";
import { formatAllFieldValues } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  searchPatient,
  getPatientSuccess,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import DateField from "../../accessories/dateField/DateField";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import TextField from "../../accessories/textField/TextField";
import { initialFields } from "./consts";
import PatientSearchItem from "./PatientSearchItem";
import "./styles.scss";
import { IDispatchProps, IStateProps, TValues, TProps } from "./types";
import { useIsSearchById } from "./useIsSearchById";

const SearchPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  patientSearchResults,
  searchPatient,
  searchStatus,
  getPatientSuccess,
}) => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: PATHS.home,
    [t("nav.patients")]: PATHS.patients,
    [t("nav.searchpatient")]: PATHS.patients_new,
  };

  const errorMessage = useSelector<IState>(
    (state) =>
      state.patients.searchResults.error?.message || t("common.somethingwrong")
  ) as string;

  const resultsRef = useRef<HTMLDivElement>(null);

  const initialValues: TValues = {
    id: "",
    firstName: "",
    secondName: "",
    birthDate: "",
    address: "",
  };

  const validationSchema = object({
    id: string().when(["firstName", "secondName", "birthDate", "address"], {
      is: (firstName, secondName, birthDate, address) =>
        !firstName && !secondName && !birthDate && !address,
      then: string().required(),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: TValues) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
      // First scroll to show searching message
      scrollToElement(resultsRef.current);
      searchPatient(formattedValues as TValues);
    },
  });

  const { setFieldValue } = formik;

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

  const renderSearchResults = (): JSX.Element | undefined => {
    switch (searchStatus) {
      case "IDLE":
        return;

      case "LOADING":
        return (
          <h3 className="searchPatient__loading">{t("common.searching")}</h3>
        );

      case "SUCCESS":
        return (
          <div className="searchPatient__results">
            <div className="searchPatient__results_count">
              {t("common.results")}:{" "}
              <strong>{patientSearchResults?.length}</strong>
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
        return <InfoBox type="warning" message={t("common.searchnotfound")} />;

      default:
        return <InfoBox type="error" message={errorMessage} />;
    }
  };

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  return (
    <div className="searchPatient">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="searchPatient__background">
        <div className="container">
          <div className="searchPatient__title">{t("nav.searchpatient")}</div>
          <form className="searchPatient__panel" onSubmit={formik.handleSubmit}>
            <div className="searchPatient__primary">
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    theme="light"
                    field={formik.getFieldProps("id")}
                    label={t("patient.patientID")}
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
                <div className="searchPatient__button__label">
                  {t("common.search")}
                </div>
              </Button>
            </div>
            <div className="searchPatient__secondary">
              <div className="searchPatient__info">
                {t("common.searchpatientinstruction")}
              </div>
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("firstName")}
                    theme="regular"
                    label={t("patient.firstname")}
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
                    label={t("patient.secondname")}
                    isValid={isValid("secondName")}
                    errorText={getErrorText("secondName")}
                    onBlur={formik.handleBlur}
                    disabled={isSearchById}
                  />
                </div>
              </div>
              <div className="row center-xs">
                <div className="searchPatient__formItem">
                  <DateField
                    theme={"regular"}
                    fieldName="birthDate"
                    fieldValue={formik.values.birthDate}
                    disableFuture={false}
                    disabled={isSearchById}
                    format="dd/MM/yyyy"
                    isValid={isValid("birthDate")}
                    errorText={getErrorText("birthDate")}
                    label={t("patient.birthdate")}
                    onChange={dateFieldHandleOnChange("birthDate")}
                  />
                </div>
                <div className="searchPatient__formItem">
                  <TextField
                    field={formik.getFieldProps("address")}
                    theme="regular"
                    label={t("patient.address")}
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
