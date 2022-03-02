import React, { FunctionComponent, useEffect, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider as DatePickerWrapper,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IProps } from "./types";
import "./styles.scss";
import TextField from "@material-ui/core/TextField";
const DateField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  disableFuture,
  disabled,
  label,
  theme,
  isValid,
  errorText,
  format,
  onChange,
  onMonthChange,
  shouldDisableDate,
  renderDay,
  views,
}) => {
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    // field value comes in timestamp string (eg. 2020-03-19T14:58:00.000Z)
    fieldValue === "" ? setValue(null) : setValue(new Date(fieldValue));
  }, [fieldValue]);

  const handleDateChange = (date: Date | null) => {
    onChange(date);
    setValue(date);
  };

  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  return (
    <DatePickerWrapper utils={DateFnsUtils}>
      <KeyboardDatePicker
        format={format}
        id={fieldName}
        name={fieldName}
        label={label}
        disabled={disabled}
        disableFuture={disableFuture}
        className={actualClassName}
        onChange={(date) => handleDateChange(date)}
        inputVariant="outlined"
        margin="dense"
        value={value}
        onMonthChange={onMonthChange}
        shouldDisableDate={shouldDisableDate}
        renderDay={renderDay}
      />
    </DatePickerWrapper>
  );
};

export default DateField;
