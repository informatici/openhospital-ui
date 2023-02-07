import React, { FunctionComponent } from "react";
import { TextField as MaterialComponent } from "@material-ui/core";
import "./styles.scss";
import { IProps } from "./types";
import { FIELD_VALIDATION } from "../../../types";

const TextField: FunctionComponent<IProps> = ({
  field,
  theme,
  label,
  type,
  isValid,
  errorText,
  multiline,
  onBlur,
  disabled,
  InputProps,
  rows = 10,
  required = FIELD_VALIDATION.IDLE,
}) => {
  const actualClassName = theme === "light" ? "textField__light" : "textField";
  return (
    <React.Fragment>
      <MaterialComponent
        id={field.name}
        label={required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label}
        type={type || ""}
        onChange={field.onChange}
        onBlur={onBlur}
        value={field.value}
        error={isValid}
        helperText={errorText}
        variant="outlined"
        className={actualClassName}
        size="small"
        multiline={multiline || false}
        rows={rows}
        margin="dense"
        disabled={disabled}
        InputProps={InputProps}
        required={required === FIELD_VALIDATION.REQUIRED}
      />
    </React.Fragment>
  );
};

export default TextField;
