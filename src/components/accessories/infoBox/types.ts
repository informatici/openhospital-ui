export interface IProps {
  type: "info" | "warning" | "error";
  message: string;
}

export enum InfoBoxType {
  Info = "info",
  Warning = "warning",
  Error = "error",
}
