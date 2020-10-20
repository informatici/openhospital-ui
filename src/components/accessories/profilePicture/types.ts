export interface IProps {
  isEditable: boolean;
  preLoadedPicture?: string;
  onChange?: (picture: string) => void;
}
