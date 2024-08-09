import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { IProps } from "./types";

import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/lab";
import { TextField as MaterialComponent } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import { PatientDTO } from "../../../generated";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { searchPatient } from "../../../state/patients";
import PatientSearchItem from "../../activities/searchPatientActivity/PatientSearchItem";
import { TValues } from "../../activities/searchPatientActivity/types";
import Button from "../button/Button";
import DateField from "../dateField/DateField";
import InfoBox from "../infoBox/InfoBox";
import TextField from "../textField/TextField";
import { currentPageConst, initialFields, itemsPerPageConst } from "./consts";

const PatientPicker: FC<IProps> = ({
  fieldName,
  fieldValue,
  isValid,
  errorText,
  onBlur,
  label,
  theme,
  initialValue,
  enableFocus = true,
}) => {
  const [value, setValue] = useState((initialValue ?? {}) as PatientDTO);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(currentPageConst);
  const [patientsPerPage] = useState(itemsPerPageConst);
  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };
  function getCurrentPatients(patients: PatientDTO[] | undefined) {
    const indexOfLastItem = currentPage * patientsPerPage;
    const indexOfFirstItem = indexOfLastItem - patientsPerPage;
    return patients?.slice(indexOfFirstItem, indexOfLastItem);
  }

  const [open, setOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(enableFocus);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCriteriaChange = () => {
    handleOpen();
  };

  const getInitialFields = () => {
    const values = getFromFields(initialFields, "value");
    values.id = initialValue?.code ?? values.id;
    values.address = initialValue?.address ?? values.address;
    values.firstName = initialValue?.firstName ?? values.firstName;
    values.secondName = initialValue?.secondName ?? values.secondName;
    values.birthDate = initialValue?.birthDate ?? values.birthDate;
    return values;
  };

  const initialValues = getInitialFields();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
      dispatch(searchPatient(formattedValues as TValues));
    },
  });

  const patientData = useAppSelector(
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
    setHasFocus(true);
    handleClose();
  };

  useEffect(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [value, hasFocus]);

  useEffect(() => {
    const pat = patientData?.find((item) => item.code === fieldValue);
    pat ? setValue(pat) : setValue(initialValue ?? ({} as any));
  }, [fieldValue]);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value) onBlur(e, value);
  };

  const searchStatus = useAppSelector(
    (state) => state.patients.searchResults.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.patients.searchResults.error?.message || t("common.somethingwrong")
  ) as string;

  const isLoading = useAppSelector(
    (state) => state.patients.searchResults.status === "LOADING"
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
        return <InfoBox type="info" message={t("common.searchnotfound")} />;

      default:
        return <InfoBox type="error" message={errorMessage} />;
    }
  };

  return (
    <>
      <FormControl variant="outlined" className="autocomplete">
        <MaterialComponent
          id="patient_search"
          inputRef={inputRef}
          label={label}
          name={fieldName}
          variant="outlined"
          value={value.name ?? ""}
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
                      setValue({} as any);
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    maxLength={50}
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
                    disabled={isLoading}
                    maxLength={50}
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
                    disabled={isLoading}
                    maxLength={50}
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
                    disabled={isLoading}
                  />
                </div>
                <div className="patientSearchForm__item submit_button">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                  >
                    {t("common.search")}
                  </Button>
                </div>
                {isLoading && (
                  <CircularProgress
                    style={{ left: "50%", top: "50%", position: "absolute" }}
                  />
                )}
              </div>
            </form>
            <div className="patientSearchResult">
              {renderSearchResults()}
              {searchStatus === "SUCCESS" && (
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
