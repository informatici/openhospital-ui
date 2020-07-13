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
  onBlur,
  InputProps,
}) => {
  const actualClassName = theme === "light" ? "textField__light" : "textField";
  return (
    <div>
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
        margin="dense"
        InputProps={InputProps}
      />
    </div>
  );
};

export default TextField;
