import { ReactNode } from "react";
import { TFilterField, TFilterValues } from "./filter/types";

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
  /**
   * Column used for the filter. When this prop is provided, don't forget to provide also [rawData]
   */
  filterColumns?: TFilterField[];
  onFilterChange?: (filter: Record<string, TFilterValues>) => void;
  /**
   * When set to true(default value), the data are not filtered internally. That means changes to the filter will only be dispached
   * to [onFilterChange]. When set to false, change to the filter will also be dispatched through [onFilterChange]
   * but internaly, rowData will be filtered according to the specified filter
   */
  manualFilter?: boolean;
  /**
   * This prop is used internally for filter, and should contain at least all field specified in [filterColumns].
   * If not provided(it recommended to provide it), rowData will be used.
   */
  rawData?: Record<string, any>[];
  /**
   * This filed is necessary for the internal filter(when manualFilter is set to false). It should be a key that identifies
   * uniquely each row(id for example) and should be present in each rowData and rawData item.
   */
  rowKey?: string;
  headerActions?: ReactNode;
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
