import React, { FunctionComponent, useEffect, useState } from "react";
import {
  KeyboardDatePicker as DatePicker,
  MuiPickersUtilsProvider as DatePickerWrapper,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IProps } from "./types";
import "./styles.scss";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
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
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    setValue(fieldValue === "" ? null : new Date(+fieldValue));
  }, [fieldValue]);

  const handleDateChange = (date: Date | null) => {
    onChange(date);
    setValue(date);
  };

  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  const pickerTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#444444",
      },
      secondary: {
        light: "#444444",
        main: "#444444",
        contrastText: "#444444",
      },
    },
  });

  return (
    <DatePickerWrapper utils={DateFnsUtils}>
      <MuiThemeProvider theme={pickerTheme}>
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
      </MuiThemeProvider>
    </DatePickerWrapper>
  );
};

export default DateField;
