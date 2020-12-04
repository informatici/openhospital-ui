import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import { IProps } from "./types";
import "./styles.scss";

const Button: FunctionComponent<IProps> = ({
  children,
  type,
  variant,
  disabled,
  onClick,
}) => {
  return (
    <div>
      <MaterialComponent
        className="button"
        type={type}
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
