import React, { FunctionComponent } from "react";
import { Button as MaterialComponent } from "@material-ui/core";
import "./styles.scss";

const TextButton: FunctionComponent = ({ children }) => {
  return (
    <div>
      <MaterialComponent className="textButton" type="button" disableElevation>
        {children}
      </MaterialComponent>
    </div>
  );
};

export default TextButton;
