import { TFilterField } from "./filter/types";

export interface IProps {
  rowData: Array<Record<string, any>>;
  labelData: Record<string, any>;
  tableHeader: Array<string>;
  dateFields?: string[];
  isCollapsabile?: boolean;
  rowsPerPage: number;
  initialOrderBy?: string;
  columnsOrder: Array<string>;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onPrint?: (row: any) => void;
  onView?: (row: any) => void;
  onAdd?: (row: any) => void;
  addTitle?: string;
  showEmptyCell?: boolean;
  renderItemDetails?: (row: any) => void;
  coreData?: Array<any>;
  identifierColumn?: string;
  getCoreRow?: <T>(val: T) => any | undefined;
  onPay?: (row: any) => void;
  onClose?: (row: any) => void;
  onCancel?: (row: any) => void;
  detailColSpan?: number;
  displayRowAction?: (row: any, action: TActions) => boolean;
  detailsExcludedFields?: string[];
  filterColumns?: TFilterField[];
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
  detailColSpan?: number;
  expanded?: boolean;
  dateFields: Array<string>;
  detailsExcludedFields?: string[];
}

export type TActions =
  | "edit"
  | "delete"
  | "view"
  | "print"
  | "pay"
  | "close"
  | "cancel"
  | "add";
