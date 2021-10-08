import * as React from "react";
import {
  AppBar,
  Card,
  Grid,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  Toolbar,
  Typography,
  Paper,
  SvgIcon,
} from "@material-ui/core";
import { FC, useCallback, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";

import { Cake, Phone, Room, Search } from "@material-ui/icons";
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
import SmallButton from "../smallButton/SmallButton";
import { TextField as MaterialComponent } from "@material-ui/core";
import { searchPatient } from "../../../state/patients/actions";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { ReactComponent as MaleIcon } from "../../../assets/gender-male.svg";
import { ReactComponent as FemaleIcon } from "../../../assets/gender-female.svg";

const PatientAutocomplete: FC<IProps> = ({ onBlur, label, theme }) => {
  const [value, setValue] = useState({} as PatientDTO);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCriteriaChange = (event: any) => {
    handleOpen();
  };
  const [change, setChange] = useState(false);
  const handleMouseDownSearch = () => {
    setChange(true);
  };

  const initialValues = getFromFields(initialFields, "value");

  //this object is used as a prop for profile component style
  const profileStyle = { height: "80px", width: "80px" };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
      dispatch(searchPatient(formattedValues as any));
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

  const isValid = (fieldName: string): boolean => {
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

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e, value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={actualClassName}>
        <MaterialComponent
          id="patient_search"
          //autoFocus
          label={label}
          variant="outlined"
          value={value?.firstName}
          type={"text"}
          onBlur={handleOnBlur}
          onMouseDown={handleMouseDownSearch}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {!value.firstName ? (
                  <IconButton
                    aria-label="toggle patient search"
                    onClick={handleCriteriaChange}
                  >
                    {change && <Search style={{ color: "white", right: 0 }} />}
                  </IconButton>
                ) : (
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
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
      </FormControl>
      <Dialog
        id="patient_search-dialog"
        title="patient_search-dialog"
        open={open}
        onClose={handleClose}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <GridCloseIcon />
            </IconButton>
            <Typography style={{ flex: 3 }} variant="h6" component="div">
              {t("patient.search")}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="patientSearch">
            <form className="patientSearchForm" onSubmit={formik.handleSubmit}>
              <div className="row start-sm center-xs">
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("patientCode")}
                    theme="regular"
                    label={t("patient.code")}
                    isValid={isValid("patientCode")}
                    errorText={getErrorText("patientCode")}
                    onBlur={formik.handleBlur}
                    type="number"
                  />
                </div>
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("firstName")}
                    theme="regular"
                    label={t("patient.firstname")}
                    isValid={isValid("firstName")}
                    errorText={getErrorText("firstName")}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                </div>
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("secondName")}
                    theme="regular"
                    label={t("patient.secondname")}
                    isValid={isValid("secondName")}
                    errorText={getErrorText("secondName")}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientSearchForm__item">
                  <TextField
                    field={formik.getFieldProps("address")}
                    theme="regular"
                    label={t("patient.address")}
                    isValid={isValid("address")}
                    errorText={getErrorText("address")}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                </div>
                <div className="patientSearchForm__item">
                  <DateField
                    fieldName="birthDay"
                    fieldValue={formik.values.birthDay}
                    disableFuture={true}
                    theme="regular"
                    format="dd/MM/yyyy"
                    isValid={isValid("birthDay")}
                    errorText={getErrorText("birthDay")}
                    label={t("patient.birthdate")}
                    onChange={dateFieldHandleOnChange("birthDay")}
                  />
                </div>
                <div className="patientSearchForm__item submit_button">
                  <SmallButton type="submit">{t("common.search")}</SmallButton>
                </div>
              </div>
            </form>
            <div className="patientSearchResult">
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {patientData?.map((patient) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      xl={3}
                      key={patientData.indexOf(patient)}
                    >
                      <Card
                        className="patient_card"
                        onClick={() => handleClick(patient)}
                      >
                        <CardActionArea>
                          <ProfilePicture
                            style={profileStyle}
                            isEditable={false}
                          />
                          <CardContent className="patient_card_content">
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h6"
                              style={{ fontSize: 16 }}
                              className="attribute_item"
                            >
                              {patient.firstName}
                              {patient.sex === "M" ? (
                                <SvgIcon className="imageIcon">
                                  <MaleIcon />
                                </SvgIcon>
                              ) : (
                                <SvgIcon className="imageIcon">
                                  <FemaleIcon />
                                </SvgIcon>
                              )}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className="attribute_item"
                            >
                              <Phone />
                              {patient.telephone}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className="attribute_item"
                            >
                              <Room />
                              {patient.address}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className="attribute_item"
                            >
                              <Cake />
                              {patient.birthDate
                                ? renderDate(patient.birthDate)
                                : ""}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PatientAutocomplete;
