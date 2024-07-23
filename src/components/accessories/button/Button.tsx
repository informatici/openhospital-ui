import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@mui/material";
import { IProps } from "./types";
import "./styles.scss";

const Button: FunctionComponent<IProps> = ({
  children,
  type,
  color = "primary",
  variant,
  disabled,
  dataCy,
  onClick,
}) => {
  return (
    <MaterialComponent
      className="button"
      type={type}
      color={color}
      variant={variant}
      disableElevation
      disabled={disabled}
      onClick={onClick}
      data-cy={dataCy}
    >
      {children}
    </MaterialComponent>
  );
};

export default Button;
