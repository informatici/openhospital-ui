export interface IEditableTableProps {
  rows: Array<{ label: string; value: string }>;
  onChange: (value: string, checked: boolean) => void;
  fieldValues?: string[];
  headerData: Array<{
    label: string;
    align: "left" | "right" | "center" | "justify";
  }>;
  title: string;
  disabled?: boolean;
}
