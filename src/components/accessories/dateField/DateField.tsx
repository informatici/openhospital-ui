import React, { FunctionComponent, useEffect, useState } from "react";
import { KeyboardDatePicker as DatePicker, MuiPickersUtilsProvider as DatePickerWrapper } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IProps } from "./types";
import "./styles.scss";

const DateField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  disableFuture,
  disabled,
  label,
  theme,
  format,
  onChange
}) => {

  const [value, setValue] = useState<Date | null>(new Date(+fieldValue));

  useEffect(() => {
    setValue(new Date(+fieldValue));
  }, [fieldValue])

  const handleDateChange = (date: Date | null) => {
    onChange(date);
    setValue(date);
  };
  
  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  return (
    <DatePickerWrapper utils={DateFnsUtils}>
      <DatePicker
        format={format}
        id={fieldName}
        label={label}
        disabled={disabled}
        disableFuture={disableFuture}
        className={actualClassName}
        onChange={handleDateChange}
        inputVariant="outlined"
        margin="dense"
        value={value}
      />  
    </DatePickerWrapper>
  );
};

export default DateField;
