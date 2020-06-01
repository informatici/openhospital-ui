import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import { IProps } from "./types";
import "./styles.scss";

const LargeButton: FunctionComponent<IProps> = ({
  children,
  type,
  variant,
  color,
}) => {
  return (
    <div>
      <MaterialComponent className="largeButton" variant="contained">
        {children}
      </MaterialComponent>
    </div>
  );
};

export default LargeButton;
