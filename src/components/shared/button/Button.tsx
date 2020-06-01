import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import { IProps } from "./types";
import "./styles.scss";

const Button: FunctionComponent<IProps> = ({
  children,
  type,
  variant,
  color,
}) => {
  return (
    <div>
      <MaterialComponent
        className="button"
        type="submit"
        variant={variant}
        disableElevation
      >
        {children}
      </MaterialComponent>
    </div>
  );
};

export default Button;
