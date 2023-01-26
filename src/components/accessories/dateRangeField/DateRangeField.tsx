import React, { FunctionComponent, useEffect, useState } from "react";
import {
  DateRange,
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
  const onChangeHandler = (value: any) => {
    onChange(value);
  };

  const actualClassName = theme === "light" ? "dateField__light" : "dateField";

  return (
    <MobileDateRangePicker
      inputFormat={format}
      disabled={disabled}
      disableFuture={disableFuture}
      onChange={() => {}}
      value={fieldValue}
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
      onAccept={onChangeHandler}
      disableCloseOnSelect={false}
      allowKeyboardControl
    />
  );
};

export default DateRangeField;
