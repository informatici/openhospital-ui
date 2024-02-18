import { CSSProperties } from "react";

export interface IProps {
  open: boolean;
  picture: string;
  onSave: (image: string) => void;
  onReset: () => void;
}
