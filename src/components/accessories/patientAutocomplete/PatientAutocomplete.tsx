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

import $ from "jquery";

const CustomPaper = (props: any) => {
  return (
    <Paper
      style={{ padding: "0px", display: "flex" }}
      elevation={8}
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
  options,
  isLoading = false,
  disabled,
  theme,
  onInputChange,
}) => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const [criteria, setCriteria] = React.useState("C");

  const geFullObj = (val: number) => {
    return options?.find((el) => el.code === val) || null;
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
    debounce(
      (event: any, value: string) =>
        onInputChange ? onInputChange(event, value, criteria) : null,
      250
    ),
    []
  );

  const profileStyle = {
    height: "50px",
    width: "50px",
    paddingRight: "10px",
  };
  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";

  const handleCriteriaChange = (event: any) => {
    setCriteria(event.target.value);
  };

  $("#search_criteria").on("click mousedown", function (e) {
    e.stopPropagation();
  });

  $("#parent_element").on("click mousedown", function () {});

  return (
    <FormControl variant="outlined" className={actualClassName}>
      <Autocomplete
        id="parent_element"
        className="main_field"
        noOptionsText={t("common.nooptionsfound")}
        disabled={disabled}
        loading={isLoading}
        options={options}
        freeSolo
        onInputChange={handleOnInputChange}
        getOptionLabel={(option) => option.firstName + ""}
        value={geFullObj(value)}
        getOptionSelected={(option, v) => option.code === v.code}
        PaperComponent={CustomPaper}
        renderOption={(option) => (
          <div className="render_option">
            <span>
              <ProfilePicture
                style={profileStyle}
                isEditable={false}
                preLoadedPicture={geFullObj(value)?.blobPhoto}
              />
            </span>
            <span style={{ fontSize: 14 }}>
              <Fragment>
                {option.firstName +
                  " " +
                  option.secondName +
                  " - " +
                  option.telephone +
                  ` ${
                    option.sex === "M" ? t("common.male") : t("common.femele")
                  }`}
              </Fragment>
            </span>
          </div>
        )}
        onChange={(e: object, val: any | null) => {
          debounceUpdate(val?.code || "");
        }}
        onBlur={handleOnBlur}
        renderInput={(params) => (
          <div className="inputSelect">
            <select
              id="search_criteria"
              value={criteria}
              onChange={handleCriteriaChange}
            >
              <option value="C">Code</option>
              <option value="F">First</option>
              <option value="S">Last</option>
              <option value="A">@</option>
              <option value="B">Birth</option>
            </select>
            <TextField
              multiline={true}
              label={label}
              {...params}
              name={fieldName}
              variant="outlined"
              size="small"
              error={isValid}
            />
          </div>
        )}
      />
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default PatientAutocomplete;
