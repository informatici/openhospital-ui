import React, { FunctionComponent, useEffect } from "react";
import { TextField as MaterialComponent } from "@material-ui/core";
import "./styles.scss";
import { IProps } from "./types";
import { FIELD_VALIDATION } from "../../../types";
import { useTranslation } from "react-i18next";

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
  maxLength,
}) => {
  const { t } = useTranslation();

  const actualClassName = theme === "light" ? "textField__light" : "textField";

  return (
    <div style={{ position: "relative" }}>
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
        inputProps={{ maxLength }}
        required={required === FIELD_VALIDATION.REQUIRED}
      />
      {maxLength && maxLength > 0 && (
        <div
          style={{
            bottom: "0px",
            transform: "translate(14px, -6px) scale(0.75);",
            position: "absolute",
            right: "25px",
            backgroundColor: "white",
            padding: "2px 6px",
            color: "gray",
            fontSize: "12px",
          }}
        >
          <small>
            {t("common.remainingchars", {
              current: maxLength - field.value.length,
              max: maxLength,
            })}
          </small>
        </div>
      )}
    </div>
  );
};

export default TextField;
