
export interface IProps {
  tableValues: Array<Record<string, any>>;
  tableHeader: Array<string>;
  tableCollapseContent?: Array<string>;
  tableCollapseComponent?: React.Component;
  isCollapsabile?: boolean;
  rowsPerPage: number;
  columnsSearch: Array<string>;
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onView?: () => void;
}

export type TActions = "edit" | "delete" | "view" | "print";