import { makeStyles } from "@material-ui/core";

export interface IExamRowTableProps {
  rows: Array<{ label: string; value: string }>;
  onBlur: (e: React.FocusEvent<any>, label: string, value: string) => void;
  fieldValues?: string[];
}
