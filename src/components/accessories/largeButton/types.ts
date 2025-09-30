import { ButtonProps } from "@mui/material";

export interface IProps extends ButtonProps {
  handleClick: () => void;
}
