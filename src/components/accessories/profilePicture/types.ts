import { CSSProperties } from "react";

export interface IProps {
  isEditable: boolean;
  preLoadedPicture?: string;
  onChange?: (picture: string) => void;
  shouldReset?: boolean;
  resetCallback?: () => void;
  style?: CSSProperties;
}
