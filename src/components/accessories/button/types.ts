export interface IProps {
  type: string;
  variant: "text" | "outlined" | "contained" | undefined;
  color: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
