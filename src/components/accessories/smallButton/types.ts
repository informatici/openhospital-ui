import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
