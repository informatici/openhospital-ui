export type TLabelBadgeProps = {
  color?: TLabelBadgeColor;
  label?: React.ReactNode;
};

export type TLabelBadgeColor =
  | "danger"
  | "success"
  | "warning"
  | "default"
  | "info";
