import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";

const LargeButton: FunctionComponent<IProps> = ({
  children,
  handleClick,
  variant = "contained",
  className = "",
  ...props
}) => {
  return (
    <Button
      {...props}
      data-slot="large-button"
      className={`largeButton ${className}`}
      variant={variant}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default LargeButton;
