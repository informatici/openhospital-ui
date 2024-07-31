import { ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren {
  type: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: ButtonProps["color"] | undefined;
  disabled?: boolean;
  dataCy?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
