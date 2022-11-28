import React, { FunctionComponent, useEffect, useState } from "react";
import {
  DateRange,
  DesktopDateRangePicker,
  MobileDateRangePicker,
  RangeInput,
} from "@material-ui/pickers";
import { IProps } from "./types";
import "./styles.scss";
import { FIELD_VALIDATION } from "../../../types";
import { TextField, useMediaQuery } from "@material-ui/core";
import { MuiTextFieldProps } from "@material-ui/pickers/_shared/PureDateInput";
const DateRangeField: FunctionComponent<IProps> = ({
  fieldName,
  startErrorText,
  endErrorText,
  startLabel,
  endLabel,
  fieldValue = [null, null],
  disableFuture,
  disabled,
  theme,
  format,
  onChange,
  shouldDisableDate,
  required = FIELD_VALIDATION.IDLE,
  open,
  okLabel,
  cancelLabel,
  TextFieldComponent,
  onAccept,
}) => {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);
  const matches = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleDateChange = (date: DateRange<Date>) => {
    onChange(date);
    setValue(date);
  };

  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  return (
    <>
      {matches ? (
        <DesktopDateRangePicker
          inputFormat={format}
          disabled={disabled}
          disableFuture={disableFuture}
          onChange={handleDateChange}
          value={value as RangeInput<Date>}
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
                  id={(fieldName ?? "") + "-from"}
                  error={Boolean(startErrorText)}
                  disabled={disabled}
                  helperText={startErrorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                  label={
                    required === FIELD_VALIDATION.SUGGESTED
                      ? startLabel + " **"
                      : startLabel
                  }
                />
                <TextField
                  {...endProps}
                  id={fieldName + "-to"}
                  error={Boolean(endErrorText)}
                  disabled={disabled}
                  helperText={endErrorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                  label={
                    required === FIELD_VALIDATION.SUGGESTED
                      ? startLabel + " **"
                      : startLabel
                  }
                />
              </div>
            )
          }
          okText={okLabel}
          cancelText={cancelLabel}
          open={open}
          onAccept={onAccept}
        />
      ) : (
        <MobileDateRangePicker
          inputFormat={format}
          disabled={disabled}
          disableFuture={disableFuture}
          onChange={handleDateChange}
          value={value as RangeInput<Date>}
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
                  id={(fieldName ?? "") + "-from"}
                  error={Boolean(startErrorText)}
                  disabled={disabled}
                  helperText={startErrorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                  label={
                    required === FIELD_VALIDATION.SUGGESTED
                      ? startLabel + " **"
                      : startLabel
                  }
                />
                <TextField
                  {...endProps}
                  id={fieldName + "-to"}
                  error={Boolean(endErrorText)}
                  disabled={disabled}
                  helperText={endErrorText}
                  variant="outlined"
                  margin="dense"
                  required={required === FIELD_VALIDATION.REQUIRED}
                  className={actualClassName}
                  label={
                    required === FIELD_VALIDATION.SUGGESTED
                      ? startLabel + " **"
                      : startLabel
                  }
                />
              </div>
            )
          }
          okText={okLabel}
          cancelText={cancelLabel}
          open={open}
          onAccept={onAccept}
          disableCloseOnSelect={false}
          allowKeyboardControl
        />
      )}
    </>
  );
};

export default DateRangeField;
