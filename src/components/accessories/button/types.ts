export interface IProps {
  type: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: "primary" | "inherit" | "secondary" | "default" | undefined;
  disabled?: boolean;
  dataCy?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
