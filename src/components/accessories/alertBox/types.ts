export interface IProps {
  type: "warning" | "error" | "info" | "success";
  title?: string;
  message: string;
}
