import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import { IProps } from "./types";
import "./styles.scss";

const Button: FunctionComponent<IProps> = ({
  children,
  type,
  color = "primary",
  variant,
  disabled,
  onClick,
}) => {
  return (
    <div>
      <MaterialComponent
        className="button"
        type={type}
        color={color}
        variant={variant}
        disableElevation
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </MaterialComponent>
    </div>
  );
};

export default Button;
