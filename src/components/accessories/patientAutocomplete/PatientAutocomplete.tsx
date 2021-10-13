import {
  debounce,
  FormControl,
  FormHelperText,
  Paper,
  SvgIcon,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./styles.scss";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import { ProfilePicture } from "../profilePicture/ProfilePicture";

import { useDispatch, useSelector } from "react-redux";
import { TValues } from "../billFilterForm/types";
import { searchPatient } from "../../../state/patients/actions";
import { IState } from "../../../types";
import { PatientDTO } from "../../../generated";
import { CakeOutlined, Phone, Room } from "@material-ui/icons";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { ReactComponent as MaleIcon } from "../../../assets/gender-male.svg";
import { ReactComponent as FemaleIcon } from "../../../assets/gender-female.svg";

const CustomPaper = (props: any) => {
  return (
    <Paper
      style={{ padding: "0", display: "flex", alignItems: "center" }}
      {...props}
    />
  );
};

const PatientAutocomplete: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  label,
  isValid,
  errorText,
  onBlur,
  disabled,
  theme,
}) => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const patientSearchResults = useSelector<IState, PatientDTO[]>(
    (state) => state.patients.searchResults.data ?? []
  );

  const searchStatus = useSelector<IState>(
    (state) => state.patients.searchResults.status || "IDLE"
  );

  const getFullObj = (val: number) => {
    return patientSearchResults?.find((el) => el.code === val) || undefined;
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur(e, getFullObj(value));
  };

  const debounceUpdate = useCallback(
    debounce((value: any) => setValue(value), 250),
    []
  );

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleOnInputChange = useCallback(
    debounce((event: any, value: string) => {
      const values = {
        firstName: value,
      } as TValues;

      dispatch(searchPatient(values));
    }, 250),
    []
  );
  // value used to style profile picture
  const profileStyle = {
    height: "50px",
    width: "50px",
  };
  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";

  const renderMinimizeTitle = (patient: PatientDTO) => {
    return (
      (patient.sex === "M" ? " ♂ " : " ♀ ") +
      patient.firstName +
      " " +
      patient.secondName +
      " ✆ " +
      patient.telephone +
      " 📍 " +
      patient.address +
      " 🎂 " +
      (patient.birthDate ? renderDate(patient.birthDate) : "")
    );
  };

  return (
    <FormControl variant="outlined" className={actualClassName}>
      <Autocomplete
        id={fieldName}
        className="main_field"
        noOptionsText={t("common.nooptionsfound")}
        disabled={disabled}
        loading={searchStatus === "LOADING"}
        options={patientSearchResults}
        freeSolo
        onInputChange={handleOnInputChange}
        getOptionLabel={(option) => option.firstName || ""}
        value={getFullObj(value) || {}}
        getOptionSelected={(option, v) => option.code === v.code}
        PaperComponent={CustomPaper}
        renderOption={(patient) => (
          <div className="render_option" title={renderMinimizeTitle(patient)}>
            <ProfilePicture
              style={profileStyle}
              isEditable={false}
              preLoadedPicture={getFullObj(value)?.blobPhoto}
            />
            <div className="info_item">
              <span>
                {patient.sex === "M" ? (
                  <SvgIcon className="small_icon">
                    <MaleIcon style={{ fontSize: "small" }} />
                  </SvgIcon>
                ) : (
                  <SvgIcon className="small_icon">
                    <FemaleIcon style={{ fontSize: "small" }} />
                  </SvgIcon>
                )}
                {patient.firstName + " " + patient.secondName}
              </span>
              <span>
                <Phone className="small_icon" />
                {patient.telephone}
              </span>
              <span className="item_info_address">
                <Room className="small_icon" />
                {patient.address}
              </span>
              <span>
                <CakeOutlined className="small_icon" />
                {patient.birthDate ? renderDate(patient.birthDate) : ""}
              </span>
            </div>
          </div>
        )}
        onChange={(e: object, val: any | null) => {
          debounceUpdate(val?.code || "");
        }}
        onBlur={handleOnBlur}
        renderInput={(params) => (
          <TextField
            multiline={true}
            label={label}
            {...params}
            name={fieldName}
            variant="outlined"
            size="small"
            error={isValid}
          />
        )}
      />
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default PatientAutocomplete;
