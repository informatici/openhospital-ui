import { AutocompleteProps as MaterialAutocompleteProps } from "@mui/material";
import { ReactNode } from "react";

export type TOption = { value: string; label: string };

export interface IOwnProps<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = "div"
> extends Partial<
    Omit<
      MaterialAutocompleteProps<
        string,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >,
      "options"
    >
  > {
  label?: ReactNode;
  placeholder?: string;
  options: TOption[];
  error?: boolean;
  helperText?: ReactNode;
}
