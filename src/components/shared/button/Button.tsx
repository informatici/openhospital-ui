import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import { IProps } from "./types";
import "./styles.scss";

const Button: FunctionComponent<IProps> = ({
  children,
  type,
  variant,
  color,
  disabled,
}) => {
  return (
    <div>
      <MaterialComponent
        className="button"
        type="submit"
        variant={variant}
        disableElevation
        disabled
      >
        {children}
      </MaterialComponent>
    </div>
  );
};

export default Button;
