import {
  debounce,
  FormControl,
  FormHelperText,
  Icon,
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
      (event: any, value: any) =>
        onInputChange ? onInputChange(event, value) : null,
      250
    ),
    []
  );

  const actualClassName =
    theme === "light" ? "autocomplete__light" : "autocomplete";

  return (
    <FormControl variant="outlined" className={actualClassName}>
      <Autocomplete
        noOptionsText={t("common.nooptionsfound")}
        disabled={disabled}
        loading={isLoading}
        options={options}
        onInputChange={handleOnInputChange}
        getOptionLabel={(option) => option.firstName + ""}
        value={geFullObj(value)}
        getOptionSelected={(option, v) => option.code === v.code}
        PaperComponent={CustomPaper}
        renderOption={(option) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "relative",
                transform: "scale(0.4)",
              }}
            >
              <ProfilePicture
                isEditable={false}
                preLoadedPicture={geFullObj(value)?.blobPhoto}
              />
            </span>
            <span>
              <Fragment>{option.firstName}</Fragment>
            </span>
          </div>
        )}
        onChange={(e: object, val: any | null) => {
          debounceUpdate(val?.value || "");
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
            fullWidth
          />
        )}
      />
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default PatientAutocomplete;
