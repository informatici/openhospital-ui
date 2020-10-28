import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";

const SelectField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  label,
  isValid,
  //   errorText,
  onBlur,
  options,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleOnBlur = (e: any) => {
    onBlur(e, value);
  };

  return (
    <FormControl variant="outlined" className="selectField" size="small">
      <InputLabel id={fieldName}>{label}</InputLabel>
      <Select
        labelId={`${fieldName}-label`}
        id={`${fieldName}-select-outlined`}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
        onBlur={handleOnBlur}
        label={label}
        error={isValid}
      >
        <MenuItem value=""> </MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(SelectField);
