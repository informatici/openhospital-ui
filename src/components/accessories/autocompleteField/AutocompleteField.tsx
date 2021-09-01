import { debounce, FormControl, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, {
  Fragment,
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IProps } from "./types";
import "./styles.scss";
import { Autocomplete } from "@material-ui/lab";

const AutocompleteField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  label,
  isValid,
  errorText,
  onBlur,
  options,
  isLoading,
  disabled,
}) => {
  const [value, setValue] = useState("");

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

  return (
    <FormControl variant="outlined" className="autocomplete">
      <Autocomplete
        freeSolo
        disabled={disabled}
        loading={isLoading}
        options={options}
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
            {...params}
            name={fieldName}
            label={label}
            variant="outlined"
            size="small"
            error={isValid}
            fullWidth
          />
        )}
      />
    </FormControl>
  );
};

export default memo(AutocompleteField);
