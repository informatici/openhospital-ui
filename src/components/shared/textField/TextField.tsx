import React, { FunctionComponent } from "react";
import { TextField as MaterialComponent } from "@material-ui/core";
import "./styles.scss";
import { IProps } from "./types";

const TextField: FunctionComponent<IProps> = ({
  field,
  label,
  type,
  isValid,
  errorText,
  onBlur,
}) => {
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
        className="textField"
        size="small"
        margin="dense"
      />
    </div>
  );
};

export default TextField;
