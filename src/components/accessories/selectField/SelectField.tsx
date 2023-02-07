import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { FIELD_VALIDATION } from "../../../types";

const SelectField: FunctionComponent<IProps> = ({
  fieldName,
  fieldValue,
  label,
  isValid,
  errorText,
  onBlur,
  onChange,
  isLoading = false,
  options,
  translateOptions = false,
  disabled = false,
  variant = "outlined",
  required = FIELD_VALIDATION.IDLE,
}) => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onBlur(e, value);
  };

  return (
    <FormControl
      disabled={disabled}
      variant={variant}
      required={required === FIELD_VALIDATION.REQUIRED}
      className="selectField"
      size="small"
    >
      <InputLabel id={fieldName} error={isValid}>
        {required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label}
      </InputLabel>
      <Select
        labelId={`${fieldName}-label`}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={(e) => {
          setValue(e.target.value as string);
          if (onChange !== undefined) onChange(e.target.value as string);
        }}
        onBlur={handleOnBlur}
        label={required === FIELD_VALIDATION.SUGGESTED ? label + " **" : label}
        error={isValid}
      >
        {isLoading && (
          <MenuItem value="" key={"nano"}>
            <CircularProgress
              style={{
                marginLeft: "50%",
                position: "relative",
              }}
              size={20}
            />
          </MenuItem>
        )}

        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {translateOptions ? t(option.label) : option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{errorText || ""}</FormHelperText>
    </FormControl>
  );
};

export default memo(SelectField);
