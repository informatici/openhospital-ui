export type TFieldAddress =
  | "value"
  | "type"
  | "isEnabled"
  | "isVisible"
  | "options";

export type TFieldType = "text" | "number" | "date" | "select" | "decimal";

export type TFieldFormattedValue = string | number;

export interface IFieldContent {
  value: string;
  type: TFieldType;
  isEnabled?: boolean;
  isVisible?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export type TFields<T extends string = string> = Record<T, IFieldContent>;
