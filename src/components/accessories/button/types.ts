import { ButtonProps, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren {
  type: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: ButtonProps["color"] | undefined;
  disabled?: boolean;
  dataCy?: string;
  sx?: SxProps<Theme>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
