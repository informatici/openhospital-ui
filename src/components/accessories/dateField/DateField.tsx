import React, { FunctionComponent, useEffect, useState } from "react";
import {
  KeyboardDatePicker as DatePicker,
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
}) => {
  const [value, setValue] = useState<Date | string>("");

  useEffect(() => {
    fieldValue === "" || fieldValue === null
      ? setValue("")
      : setValue(new Date(fieldValue));
  }, [fieldValue]);

  const handleDateChange = (date: Date | string | null) => {
    date ? onChange(date) : onChange("");
    date ? setValue(date) : setValue("");
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
        onMonthChange={onMonthChange}
        shouldDisableDate={shouldDisableDate}
        renderDay={renderDay}
        TextFieldComponent={(props): any => (
          <TextField
            {...props}
            name={""}
            error={isValid}
            variant="outlined"
            margin="dense"
            helperText={errorText}
            autoComplete={"off"}
          />
        )}
      />
    </DatePickerWrapper>
  );
};

export default DateField;
