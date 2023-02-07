export interface IProps {
  type: InfoBoxType | string;
  message: string;
}

export enum InfoBoxType {
  Info = "info",
  Warning = "warning",
  Error = "error",
}
