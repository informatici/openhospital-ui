import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import "./styles.scss";
import { IProps } from "./types";

const SmallButton: FunctionComponent<IProps> = ({ children, type }) => {
  return (
    <div>
      <MaterialComponent className="smallButton" type={type} disableElevation>
        {children}
      </MaterialComponent>
    </div>
  );
};

export default SmallButton;
