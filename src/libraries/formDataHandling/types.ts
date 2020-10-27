export type TFieldAddress = "value" | "type" | "isEnabled" | "isVisible";

export type TFieldType = "text" | "number" | "date";

export type TFieldFormattedValue = string | number;

export interface IFieldContent {
  value: string;
  type: TFieldType;
  isEnabled?: boolean;
  isVisible?: boolean;
}

export type TFields<T extends string = string> = Record<T, IFieldContent>;
