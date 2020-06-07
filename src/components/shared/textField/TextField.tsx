import React, { FunctionComponent } from "react";
import { TextField as MaterialComponent } from "@material-ui/core";
import "./styles.scss";
import { IProps } from "./types";

const TextField: FunctionComponent<IProps> = ({
  className,
  field,
  theme,
  label,
  type,
  isValid,
  errorText,
  onBlur,
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
      />
    </div>
  );
};

export default TextField;
