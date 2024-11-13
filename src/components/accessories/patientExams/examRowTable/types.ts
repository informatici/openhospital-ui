export interface IEditableTableProps {
  rows: Array<{ label: string; value: string }>;
  onChange: (value: string, checked: boolean) => void;
  fieldValues?: string[];
  title: string;
  disabled?: boolean;
}
