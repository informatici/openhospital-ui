import { ExpandMore } from "@mui/icons-material";
import {
  Chip,
  FormControl,
  FormHelperText,
  Autocomplete as MaterialAutocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { isArray } from "lodash";
import React, { useCallback } from "react";
import "./styles.scss";
import { IOwnProps } from "./types";

const filter = createFilterOptions<string>();

export function Autocomplete<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = "div"
>({
  label = "",
  placeholder = "",
  options = [],
  error,
  helperText,
  ...props
}: IOwnProps<Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const getOptionLabel = useCallback(
    (option: string) => {
      return options.find((item) => item.value === option)?.label ?? option;
    },
    [options]
  );

  const actualClassName = "autocomplete";

  return (
    <FormControl variant="outlined" className={actualClassName}>
      <MaterialAutocomplete
        {...props}
        options={[
          ...options.map((option) => option.value),
          ...(isArray(props.value)
            ? props.value?.filter((item) => getOptionLabel(item) === item) ?? []
            : []),
        ]}
        getOptionLabel={props.getOptionLabel ?? getOptionLabel}
        filterOptions={
          props.freeSolo
            ? (options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                const isExisting = options?.some(
                  (option) => inputValue === option
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }

                return filtered;
              }
            : props.filterOptions
        }
        renderTags={
          props.renderTags ??
          ((value, getTagProps) =>
            value.map((option, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  variant="outlined"
                  label={(props.getOptionLabel ?? getOptionLabel)(option)}
                  key={key}
                  {...tagProps}
                />
              );
            }))
        }
        renderInput={
          props.renderInput ??
          ((params) => (
            <TextField
              {...params}
              size="small"
              variant="outlined"
              label={label}
              placeholder={placeholder}
              fullWidth
            />
          ))
        }
        popupIcon={props.popupIcon ?? <ExpandMore />}
      />
      <FormHelperText error>{helperText || ""}</FormHelperText>
    </FormControl>
  );
}
