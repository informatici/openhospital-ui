import { TFieldAddress, TFieldFormattedValue, TFields } from "./types";

export const getFromFields = (fields: TFields, fieldAddress: TFieldAddress) => {
  return Object.keys(fields).reduce((acc: Record<string, any>, key) => {
    acc[key] = fields[key][fieldAddress];
    return acc;
  }, {});
};

export const formatFieldValues = (
  fields: TFields,
  values: Record<string, string>
) => {
  return Object.keys(fields).reduce(
    (acc: Record<string, TFieldFormattedValue>, key) => {
      if (fields[key].type === "number") {
        acc[key] = parseInt(values[key]);
      } else {
        acc[key] = values[key];
      }
      return acc;
    },
    {}
  );
};
