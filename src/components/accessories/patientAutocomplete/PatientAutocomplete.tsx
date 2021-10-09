import {
  debounce,
  FormControl,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, {
  Fragment,
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
import { CakeOutlined, Phone } from "@material-ui/icons";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import Home from "@material-ui/icons/Home";

const CustomPaper = (props: any) => {
  return (
    <Paper
      style={{ padding: "0px", display: "flex", alignItems: "center" }}
      //elevation={5}
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

  const geFullObj = (val: number) => {
    return patientSearchResults?.find((el) => el.code === val) || null;
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur(e, value);
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

  const profileStyle = {
    height: "50px",
    width: "50px",
  };
  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";

  return (
    <FormControl variant="outlined" className={actualClassName}>
      <Autocomplete
        id="parent_element"
        className="main_field"
        noOptionsText={t("common.nooptionsfound")}
        disabled={disabled}
        loading={searchStatus === "LOADING"}
        options={patientSearchResults}
        freeSolo
        onInputChange={handleOnInputChange}
        getOptionLabel={(option) => option.firstName + ""}
        value={geFullObj(value)}
        getOptionSelected={(option, v) => option.code === v.code}
        PaperComponent={CustomPaper}
        renderOption={(option) => (
          <div className="render_option">
            <ProfilePicture
              style={profileStyle}
              isEditable={false}
              preLoadedPicture={geFullObj(value)?.blobPhoto}
            />
            <span className="info_item">
              <Fragment>{option.firstName + " " + option.secondName}</Fragment>
              <Fragment>
                <Phone />
                {option.telephone}
              </Fragment>
              <Fragment>
                <Home />
                {option.address}
              </Fragment>
              <Fragment>
                <CakeOutlined />
                {option.birthDate ? renderDate(option.birthDate) : ""}
              </Fragment>
            </span>
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
