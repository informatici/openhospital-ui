import { ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  color?: ButtonProps["color"];
  disabled?: boolean;
  dataCy?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  startIcon?: React.ReactNode;
}
