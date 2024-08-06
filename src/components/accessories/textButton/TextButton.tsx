import { Button as MaterialComponent } from "@mui/material";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";

const TextButton: FunctionComponent<IProps> = ({ children, onClick }) => {
  return (
    <div>
      <MaterialComponent
        className="textButton"
        onClick={onClick}
        type="button"
        disableElevation
      >
        {children}
      </MaterialComponent>
    </div>
  );
};

export default TextButton;
