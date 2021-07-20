import { TOrder } from "../../../libraries/sortUtils/types";

export interface IProps {
  rowData: Array<Record<string, any>>;
  labelData: Record<string, any>;
  tableHeader: Array<string>;
  isCollapsabile?: boolean;
  rowsPerPage: number;
  columnsOrder: Array<string>;
  compareRows?: <Key extends string | number | symbol>(
    order: TOrder,
    key: Key
  ) => (a: any, b: any) => number;
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
