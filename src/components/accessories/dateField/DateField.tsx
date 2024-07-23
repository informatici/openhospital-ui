import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { IProps } from "./types";
import "./styles.scss";
import { FIELD_VALIDATION } from "../../../types";
import { TextField, TextFieldProps, useMediaQuery } from "@mui/material";
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
  required = FIELD_VALIDATION.IDLE,
  open,
  okLabel,
  cancelLabel,
  TextFieldComponent,
}) => {
  const [value, setValue] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorElRef = useRef(null);
  const matches = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    setAnchorEl(anchorElRef?.current);
  }, [anchorElRef]);

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
    <div ref={anchorElRef}>
      {matches ? (
        <DesktopDatePicker
          format={format}
          label={
            required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label
          }
          disabled={disabled}
          disableFuture={disableFuture}
          onChange={(date: any) => handleDateChange(date)}
          value={value}
          onMonthChange={onMonthChange}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            popper: {
              placement: "bottom-end",
              anchorEl: anchorEl,
            },
            textField: {
              id: fieldName,
              error: Boolean(errorText),
              disabled,
              helperText: errorText,
              variant: "outlined",
              margin: "dense",
              required: required === FIELD_VALIDATION.REQUIRED,
              className: actualClassName,
            },
          }}
          views={views}
          open={open}
        />
      ) : (
        <MobileDatePicker
          format={format}
          label={
            required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label
          }
          disabled={disabled}
          disableFuture={disableFuture}
          onChange={(date: any) => handleDateChange(date)}
          value={value}
          onMonthChange={onMonthChange}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            textField: {
              id: fieldName,
              error: Boolean(errorText),
              disabled,
              helperText: errorText,
              variant: "outlined",
              margin: "dense",
              required: required === FIELD_VALIDATION.REQUIRED,
              className: actualClassName,
            },
          }}
          views={views}
          open={open}
        />
      )}
    </div>
  );
};

export default DateField;
