import React, { FunctionComponent } from "react";
import { TextField as MaterialUITextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { styles } from "./styles";
import { IProps } from "./types";

const TextField: FunctionComponent<IProps> = ({ classes, field, label, type, isValid, errorText }) => {
  return (
    <MaterialUITextField
      id={field.name}
      label={label}
      type={type || ""}
      onChange={field.onChange}
      value={field.value}
      error={isValid}
      helperText={errorText}
      className={classNames(classes.formField, classes.cssOutlinedInput)}
      InputLabelProps={{
        classes: {
          root: classes.formFieldInputLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          input: classes.input,
          notchedOutline: classes.cssOutlinedInput,
        },
      }}
      margin="normal"
      variant="outlined"
    />
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(TextField);
export default styledComponent;
