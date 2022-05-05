import React, { FunctionComponent, useEffect, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider as DatePickerWrapper,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IProps } from "./types";
import "./styles.scss";
import TextField from "@material-ui/core/TextField";
import { FIELD_VALIDATION } from "../../../types";
import { Checkbox, FormControlLabel } from "@material-ui/core";
const CheckboxField: FunctionComponent<IProps> = ({
  fieldName,
  checked,
  disabled,
  label,
  theme,
  onChange,
}) => {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    // field value comes in timestamp string (eg. 2020-03-19T14:58:00.000Z)
    setValue(checked);
  }, [checked]);

  const handleChange = (event: any, value: boolean) => {
    onChange(value);
    setValue(value);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={value} onChange={handleChange} name={fieldName} />
      }
      label={label}
    />
  );
};

export default CheckboxField;
