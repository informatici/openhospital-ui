import { debounce, FormControl, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IProps } from "./types";
import "./styles.scss";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";

const AutocompleteField: FunctionComponent<IProps> = ({
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
  freeSolo = false,
}) => {
  const [value, setValue] = useState("");

  const { t } = useTranslation();

  const geFullObj = (val: string) => {
    return options?.find((el) => el.value === val) || null;
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
        freeSolo={freeSolo}
        noOptionsText={t("common.nooptionsfound")}
        disabled={disabled}
        loading={isLoading}
        options={options}
        onInputChange={handleOnInputChange}
        getOptionLabel={(option) => option.label}
        value={geFullObj(value)}
        getOptionSelected={(option, v) => option.value === v.value}
        renderOption={(option) => <Fragment>{option.label}</Fragment>}
        onChange={(e: object, val: any | null) => {
          debounceUpdate(val?.value || "");
        }}
        onBlur={handleOnBlur}
        renderInput={(params) => (
          <TextField
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

export default AutocompleteField;
