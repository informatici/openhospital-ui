import { FormControl, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, {
  Fragment,
  FunctionComponent,
  memo,
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
}) => {
  const [value, setValue] = useState("");

  const geFullObj = (val: string) => {
    return options?.find((el) => el.value === val) || null;
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur(e, value);
  };

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  return (
    <FormControl variant="outlined" className="autocomplete" size="small">
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={geFullObj(value)}
        getOptionSelected={(option, v) => option.value === v.value}
        renderOption={(option) => <Fragment>{option.label}</Fragment>}
        onChange={(e: object, val: any | null) => {
          setValue(val?.value || "");
        }}
        onBlur={handleOnBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            name={fieldName}
            label={label}
            variant="outlined"
            error={isValid}
            fullWidth
          />
        )}
      />
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default memo(AutocompleteField);
