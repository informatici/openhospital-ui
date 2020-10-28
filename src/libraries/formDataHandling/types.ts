export type TFieldAddress = "value" | "type" | "options" | "isEnabled" | "isVisible";

export type TFieldType = "text" | "number" | "date" | "select";

export type TSelectFieldValues = Array<Record<string | number, string>>;

export type TFieldFormattedValue = string | number;

export interface IFieldContent {
  value: string;
  type: TFieldType;
  options?: TSelectFieldValues
  isEnabled?: boolean;
  isVisible?: boolean;
}

export type TFields<T extends string = string> = Record<T, IFieldContent>;
