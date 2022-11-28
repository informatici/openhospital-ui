import React, { FunctionComponent, useEffect, useState } from "react";
import {
  DatePicker,
  DateRange,
  DateRangeDelimiter,
  DesktopDatePicker,
  DesktopDateRangePicker,
  MobileDatePicker,
  MobileDateRangePicker,
  RangeInput,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IProps } from "./types";
import "./styles.scss";
import { FIELD_VALIDATION } from "../../../types";
import { IconButton, TextField, useMediaQuery } from "@material-ui/core";
import { CalendarTodayRounded } from "@material-ui/icons";
import { MuiTextFieldProps } from "@material-ui/pickers/_shared/PureDateInput";
const DateRangeField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue = [null, null],
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
  required = FIELD_VALIDATION.IDLE,
  open,
  okLabel,
  cancelLabel,
  TextFieldComponent,
}) => {
  const [value, setValue] = useState<DateRange<Date> | null>([null, null]);
  const matches = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleDateChange = (date: DateRange<Date> | null) => {
    onChange(date);
    setValue(date);
  };

  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  return (
    <>
      {matches ? (
        <DesktopDateRangePicker
          inputFormat={format}
          label={
            required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label
          }
          disabled={disabled}
          disableFuture={disableFuture}
          onChange={(date: any) => handleDateChange(date)}
          value={value as RangeInput<Date | null>}
          onMonthChange={onMonthChange}
          shouldDisableDate={shouldDisableDate}
          renderInput={(
            startProps: MuiTextFieldProps,
            endProps: MuiTextFieldProps
          ) =>
            TextFieldComponent ? (
              <TextFieldComponent />
            ) : (
              <div className={"dateRange"}>
                <TextField
                  {...startProps}
                  id={fieldName + "-from"}
                  error={Boolean(errorText)}
                  disabled={disabled}
                  helperText={errorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                />
                <TextField
                  {...endProps}
                  id={fieldName + "-to"}
                  error={Boolean(errorText)}
                  disabled={disabled}
                  helperText={errorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                />
              </div>
            )
          }
          okText={okLabel}
          cancelText={cancelLabel}
          open={open}
        />
      ) : (
        <MobileDateRangePicker
          inputFormat={format}
          label={
            required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label
          }
          disabled={disabled}
          disableFuture={disableFuture}
          onChange={(date: any) => handleDateChange(date)}
          value={value as RangeInput<Date | null>}
          onMonthChange={onMonthChange}
          shouldDisableDate={shouldDisableDate}
          renderInput={(
            startProps: MuiTextFieldProps,
            endProps: MuiTextFieldProps
          ) =>
            TextFieldComponent ? (
              <TextFieldComponent />
            ) : (
              <div className={"dateRange"}>
                <TextField
                  {...startProps}
                  id={fieldName + "-from"}
                  error={Boolean(errorText)}
                  disabled={disabled}
                  helperText={errorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                />
                <TextField
                  {...endProps}
                  id={fieldName + "-to"}
                  error={Boolean(errorText)}
                  disabled={disabled}
                  helperText={errorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                />
              </div>
            )
          }
          okText={okLabel}
          cancelText={cancelLabel}
          open={open}
        />
      )}
    </>
  );
};

export default DateRangeField;
