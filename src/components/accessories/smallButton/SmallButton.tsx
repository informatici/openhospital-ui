import { Button as MaterialComponent } from "@mui/material";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";

const SmallButton: FunctionComponent<IProps> = ({
  children,
  type = "button",
  disabled,
  onClick,
}) => {
  return (
    <div>
      <MaterialComponent
        className="smallButton"
        disabled={disabled}
        type={type}
        onClick={onClick}
        disableElevation
      >
        {children}
      </MaterialComponent>
    </div>
  );
};

export default SmallButton;
