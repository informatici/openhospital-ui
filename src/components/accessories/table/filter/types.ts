export interface IOwnProps {
  field: TFilterField;
  onChange: (filter: TFilterValues) => void;
}

export type TFilterField =
  | {
      key: string;
      label: string;
      type: "text" | "number" | "date" | "boolean";
    }
  | {
      key: string;
      label: string;
      type: "select";
      autocomplete?: boolean;
      options: { label: string; value: string }[];
    };

export type TFilterValues = {
  value?: number | string | boolean;
  min?: number | string;
  max?: number | string;
};

export type TFilterFormFieldName = "value" | "min" | "max";
