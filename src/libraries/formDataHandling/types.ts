export type TFieldAddress =
  | "value"
  | "type"
  | "isEnabled"
  | "isVisible"
  | "options";

export type TFieldType = "text" | "number" | "date" | "select" | "decimal";

export type TFieldFormattedValue = string | number | any;

export interface IForm<T extends string, U> {
  fields: TFields<T>;
  onSubmit: (param: U) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export interface IFieldContent {
  value: string;
  type: TFieldType;
  isEnabled?: boolean;
  isVisible?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export type TFields<T extends string = string> = Record<T, IFieldContent>;
