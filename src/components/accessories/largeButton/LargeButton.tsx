import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@mui/material";
import { IProps } from "./types";
import "./styles.scss";

const LargeButton: FunctionComponent<IProps> = ({ children, handleClick }) => {
  return (
    <div>
      <MaterialComponent
        className="largeButton"
        variant="contained"
        onClick={handleClick}
      >
        {children}
      </MaterialComponent>
    </div>
  );
};

export default LargeButton;
