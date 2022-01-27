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
  onPrint?: <T>(row: T) => void;
  onView?: <T>(row: T) => void;
  showEmptyCell?: boolean;
  renderItemDetails?: (row: any) => void;
  coreData?: Array<any>;
  identifierColumn?: string;
  getCoreRow?: <T>(val: T) => any | undefined;
  onPay?: (row: any) => void;
  onClose?: (row: any) => void;
  title?: string;
}

export interface IRowProps {
  row: Record<string, any>;
  rowIndex: number;
  labelData: Record<string, any>;
  tableHeader: Array<string>;
  isCollapsabile?: boolean;
  renderActions: () => void;
  showEmptyCell?: boolean;
  renderCellDetails?: <T>(row: T) => any;
  coreRow?: any;
}

export type TActions = "edit" | "delete" | "view" | "print" | "pay" | "close";
