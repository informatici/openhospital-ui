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
  onEdit?: <T>(row: T) => void;
  onDelete?: <T>(row: T) => void;
  onPrint?: () => void;
  onView?: <T>(row: T) => void;
  showEmptyCell?: boolean;
}

export interface IRowProps {
  row: Record<string, any>;
  rowIndex: number;
  labelData: Record<string, any>;
  tableHeader: Array<string>;
  isCollapsabile?: boolean;
  renderActions: () => void;
  showEmptyCell?: boolean;
}

export type TActions = "edit" | "delete" | "view" | "print";
