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
import { TextField } from "@material-ui/core";
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
  allowSameDateSelection = true,
}) => {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleDateChange = (date: DateRange<Date>) => {
    setValue(date);
  };

  const onAccept = (value: any) => {
    onChange(value);
  };

  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  return (
    <MobileDateRangePicker
      inputFormat={format}
      disabled={disabled}
      disableFuture={disableFuture}
      onChange={handleDateChange}
      value={value as RangeInput<Date>}
      shouldDisableDate={shouldDisableDate}
      allowSameDateSelection={allowSameDateSelection}
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
                  ? endLabel + " **"
                  : endLabel
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
  );
};

export default DateRangeField;
