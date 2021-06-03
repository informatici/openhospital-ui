import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";

const SelectField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  label,
  isValid,
  errorText,
  onBlur,
  options,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onBlur(e, value);
  };

  return (
    <FormControl variant="outlined" className="selectField" size="small">
      <InputLabel id={fieldName} error={isValid}>
        {label}
      </InputLabel>
      <Select
        labelId={`${fieldName}-label`}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
        onBlur={handleOnBlur}
        label={label}
        error={isValid}
      >
        <MenuItem value="" key={"nano"}>
          {" "}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default memo(SelectField);
