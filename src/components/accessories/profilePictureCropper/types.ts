import { CSSProperties } from "react";

export interface IProps {
  open: boolean;
  picture: string;
  rounded?: boolean;
  onSave: (croppedImage: string) => void;
  onClose: () => void;
}
