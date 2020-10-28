import React, { FunctionComponent, memo } from "react";
import { TextField } from "@material-ui/core";
import { useRifm } from "rifm";
import { formatToDate } from "./utils";
import { IProps } from "./types";
import "./styles.scss";

const DateField: FunctionComponent<IProps> = ({
  fieldName,
  label,
  isValid,
  errorText,
  onBlur,
  disabled,
  InputProps,
}) => {
  const [value, setValue] = React.useState("");
  const rifm = useRifm({
    value,
    onChange: setValue,
    format: formatToDate,
  });

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
