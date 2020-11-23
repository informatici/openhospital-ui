import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { useRifm } from "rifm";
import { formatToDate } from "./utils";
import { IProps } from "./types";
import "./styles.scss";

const DateField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  label,
  isValid,
  errorText,
  onBlur,
  disabled,
  InputProps,
}) => {
  const [value, setValue] = useState("");
  const rifm = useRifm({
    value,
    onChange: setValue,
    format: formatToDate,
  });

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleOnBlur = (e: any) => {
    onBlur(e, value);
  };

  return (
    <TextField
      type="tel"
      id={fieldName}
      label={label}
      onChange={rifm.onChange}
      onBlur={handleOnBlur}
      value={rifm.value}
      error={isValid}
      helperText={errorText}
      variant="outlined"
      className="dateField"
      size="small"
      margin="dense"
      disabled={disabled}
      InputProps={InputProps}
    />
  );
};

export default memo(DateField);
