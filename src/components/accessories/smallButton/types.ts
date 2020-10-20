export interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
