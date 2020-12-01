import React, { FunctionComponent } from "react";
import { TextField as MaterialComponent } from "@material-ui/core";
import "./styles.scss";
import { IProps } from "./types";

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
}) => {
  const actualClassName = theme === "light" ? "textField__light" : "textField";
  return (
    <React.Fragment>
      <MaterialComponent
        id={field.name}
        label={label}
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
        rows={10}
        margin="dense"
        disabled={disabled}
        InputProps={InputProps}
      />
    </React.Fragment>
  );
};

export default TextField;
