
export interface IProps {
  rowData: Array<Record<string, any>>;
  labelData: Record<string, any>;
  tableHeader: Array<string>;
  isCollapsabile?: boolean;
  rowsPerPage: number;
  columnsOrder: Array<string>;
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onView?: () => void;
}

export interface IRowProps {
  row: Record<string, any>;
  rowIndex: number;
  labelData: Record<string, any>;
  tableHeader: Array<string>;
  isCollapsabile?: boolean;
  renderActions: () => void;
}

export type TActions = "edit" | "delete" | "view" | "print";