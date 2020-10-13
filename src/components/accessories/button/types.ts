export interface IProps {
  type: "button" | "submit" | "reset" | undefined;
  variant: "text" | "outlined" | "contained" | undefined;
  color: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
