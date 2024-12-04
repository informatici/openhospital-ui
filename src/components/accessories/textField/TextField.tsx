import { Help } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField as MaterialComponent,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FIELD_VALIDATION } from "../../../types";
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
  rows = 10,
  required = FIELD_VALIDATION.IDLE,
  maxLength,
  helpText,
  helpTooltipText,
}) => {
  const { t } = useTranslation();
  const [helpAnchorEl, setHelpAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const actualClassName = theme === "light" ? "textField__light" : "textField";

  const handleOpenHelp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleCloseHelp = () => {
    setHelpAnchorEl(null);
  };

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
        InputProps={{
          ...InputProps,
          endAdornment: helpText ? (
            <InputAdornment position="end">
              <Tooltip title={helpTooltipText ?? t("common.help")}>
                <IconButton
                  aria-label="Show help"
                  onClick={handleOpenHelp}
                  edge="end"
                  size="small"
                >
                  <Help />
                </IconButton>
              </Tooltip>
              <Popover
                open={Boolean(helpAnchorEl)}
                anchorEl={helpAnchorEl}
                onClose={handleCloseHelp}
                slotProps={{
                  paper: {
                    style: {
                      maxWidth: "200px",
                      padding: "16px",
                      textAlign: "justify",
                    },
                  },
                }}
              >
                <Help fontSize="small" color="primary" />
                <Typography fontSize={14}>{helpText}</Typography>
              </Popover>
            </InputAdornment>
          ) : (
            InputProps?.endAdornment
          ),
        }}
        inputProps={{ maxLength }}
        InputLabelProps={{ shrink: !!field.value }}
        required={required === FIELD_VALIDATION.REQUIRED}
      />
      {maxLength && maxLength > 0 && (
        <div
          style={{
            bottom: "-9px",
            transform: "translate(14px, -6px) scale(0.75)",
            position: "absolute",
            right: "25px",
            backgroundColor: "white",
            padding: "2px 6px",
            color: "gray",
            fontSize: "14px",
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
