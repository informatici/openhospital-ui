export interface IEditableTableProps {
  rows: Array<{ label: string; value: string }>;
  onBlur: (value: string) => void;
  fieldValues?: string[];
  headerData: Array<{
    label: string;
    align: "left" | "right" | "center" | "justify";
  }>;
  title: string;
  disabled?: boolean;
}
