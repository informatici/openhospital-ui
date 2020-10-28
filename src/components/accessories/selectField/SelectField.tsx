import React, { FunctionComponent } from "react";
import { FormControl, Select, InputLabel as Label, MenuItem as Option, FormHelperText } from '@material-ui/core';
import "./styles.scss";
import { IProps } from "./types";

const SelectField: FunctionComponent<IProps> = ({
  field,
  label,
  theme,
  options,
  isValid,
  errorText,
  disabled,
  onBlur,
}) => {

  const renderOptions = () => {
    return options.map((item, index) => {
      return (
        <Option value={item.value} key={index}>{item.label}</Option>
      );
    });
  }

  const actualClassName = theme === "light" ? "selectField_wrapper__light" : "selectField_wrapper";

  return (
    <FormControl className={actualClassName} variant="outlined" error={isValid} disabled={disabled}>
      <Label id={field.name}>{label}</Label>
      <Select
        labelId={field.name}
        label={label}
        name={field.name}
        className={"selectField"}
        value={field.value}
        onChange={field.onChange}
        onBlur={onBlur}
        margin="dense"
      >
        { renderOptions() }
      </Select>
      {(isValid) ? <FormHelperText>{errorText}</FormHelperText> : ''}
    </FormControl>
  );
}

export default SelectField;