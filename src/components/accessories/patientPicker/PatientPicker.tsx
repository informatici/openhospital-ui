import * as React from "react";
import {
  AppBar,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  Toolbar,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { FC, useCallback, useState, useRef, useEffect } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";

import { Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { GridCloseIcon } from "@material-ui/data-grid";
import { get, has } from "lodash";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { initialFields } from "./consts";
import { useFormik } from "formik";
import { IState } from "../../../types";
import { PatientDTO } from "../../../generated";
import TextField from "../textField/TextField";
import DateField from "../dateField/DateField";
import Button from "../button/Button";
import { TextField as MaterialComponent } from "@material-ui/core";
import { searchPatient } from "../../../state/patients/actions";
import InfoBox from "../infoBox/InfoBox";
import { TValues } from "../../activities/searchPatientActivity/types";
import PatientSearchItem from "../../activities/searchPatientActivity/PatientSearchItem";
import { Pagination } from "@material-ui/lab";

const PatientPicker: FC<IProps> = ({
  fieldName,
  fieldValue,
  isValid,
  errorText,
  onBlur,
  label,
  theme,
}) => {
  const [value, setValue] = useState({} as PatientDTO);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);
  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };
  function getCurrentPatients(patients: PatientDTO[] | undefined) {
    const indexOfLastItem = currentPage * patientsPerPage;
    const indexOfFirstItem = indexOfLastItem - patientsPerPage;
    return patients?.slice(indexOfFirstItem, indexOfLastItem);
  }
  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCriteriaChange = () => {
    handleOpen();
  };

  const initialValues = getFromFields(initialFields, "value");

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
      dispatch(searchPatient(formattedValues as TValues));
    },
  });

  const patientData = useSelector<IState, PatientDTO[] | undefined>(
    (state) => state.patients.searchResults.data
  );

  const { setFieldValue } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  const fieldIsValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const handleClick = (patient: PatientDTO) => {
    setValue(patient);
    handleClose();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [value]);

  useEffect(() => {
    const pat = patientData?.find((item) => item.code === fieldValue);
    pat ? setValue(pat) : setValue({});
  }, [fieldValue]);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value) onBlur(e, value);
  };

  const searchStatus = useSelector<IState, string | undefined>(
    (state) => state.patients.searchResults.status
  );
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
              {t("common.results")}: <strong>{patientData?.length}</strong>
            </div>
            <div className="searchPatient__results_list">
              {getCurrentPatients(patientData)?.map((patient, index) => (
                <div onClick={() => handleClick(patient)}>
                  <PatientSearchItem
                    key={index}
                    patient={patient}
                    hideAdditionalInformation={true}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "SUCCESS_EMPTY":
        return <InfoBox type="warning" message={t("common.searchnotfound")} />;

      default:
        return <InfoBox type="error" message={t("common.somethingwrong")} />;
    }
  };

  return (
    <>
      <FormControl variant="outlined" className={actualClassName}>
        <MaterialComponent
          id="patient_search"
          inputRef={inputRef}
          label={label}
          name={fieldName}
          variant="outlined"
          value={value.firstName ?? ""}
          type={"text"}
          onBlur={handleOnBlur}
          onMouseDown={handleCriteriaChange}
          InputLabelProps={{ shrink: true }}
          error={isValid}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {!value?.firstName ? (
                  <IconButton
                    aria-label="toggle patient search"
                    onMouseDown={handleCriteriaChange}
                  >
                    <Search />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="start"
                    color="inherit"
                    onMouseDown={(event: any) => {
                      event.stopPropagation();
                      setValue({});
                    }}
                    aria-label="close"
                  >
                    <GridCloseIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText error>{errorText || ""}</FormHelperText>
      </FormControl>
      <Dialog
        id="patient_search-dialog"
        title="Patient Search Dialog"
        open={open}
        onClose={handleClose}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <Typography style={{ flex: 1 }} variant="h6" component="div">
              {t("patient.search")}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={(event: any) => {
                handleClose();
              }}
              aria-label="close"
            >
              <GridCloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="patientSearch">
            <form className="patientSearchForm" onSubmit={formik.handleSubmit}>
              <div className="row start-sm center-xs">
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("id")}
                    theme="regular"
                    label={t("patient.code")}
                    isValid={fieldIsValid("id")}
                    errorText={getErrorText("id")}
                    onBlur={formik.handleBlur}
                    type="number"
                    disabled={searchStatus === "LOADING"}
                  />
                </div>
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("firstName")}
                    theme="regular"
                    label={t("patient.firstname")}
                    isValid={fieldIsValid("firstName")}
                    errorText={getErrorText("firstName")}
                    onBlur={formik.handleBlur}
                    type="text"
                    disabled={searchStatus === "LOADING"}
                  />
                </div>
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("secondName")}
                    theme="regular"
                    label={t("patient.secondname")}
                    isValid={fieldIsValid("secondName")}
                    errorText={getErrorText("secondName")}
                    onBlur={formik.handleBlur}
                    type="text"
                    disabled={searchStatus === "LOADING"}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("address")}
                    theme="regular"
                    label={t("patient.address")}
                    isValid={fieldIsValid("address")}
                    errorText={getErrorText("address")}
                    onBlur={formik.handleBlur}
                    type="text"
                    disabled={searchStatus === "LOADING"}
                  />
                </div>
                <div className="patientSearchForm__item">
                  <DateField
                    fieldName="birthDate"
                    fieldValue={formik.values.birthDate}
                    disableFuture={true}
                    theme="regular"
                    format="dd/MM/yyyy"
                    isValid={fieldIsValid("birthDate")}
                    errorText={getErrorText("birthDate")}
                    label={t("patient.birthdate")}
                    onChange={dateFieldHandleOnChange("birthDate")}
                    disabled={searchStatus === "LOADING"}
                  />
                </div>
                <div className="patientSearchForm__item submit_button">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={searchStatus === "LOADING"}
                  >
                    {t("common.search")}
                  </Button>
                </div>
              </div>
            </form>
            <div className="patientSearchResult">
              {renderSearchResults()}
              {(patientData?.length ?? 0) > 0 && (
                <Pagination
                  className="resultPagination"
                  onChange={handlePageChange}
                  count={Math.ceil(
                    (patientData?.length ?? 0) / patientsPerPage
                  )}
                  page={currentPage}
                  color="primary"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default PatientPicker;
