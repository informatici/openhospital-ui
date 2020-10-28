import { TFieldAddress, TFieldFormattedValue, TFields } from "./types";

export const getFromFields = (fields: TFields, fieldAddress: TFieldAddress) => {
  return Object.keys(fields).reduce((acc: Record<string, any>, key) => {
    acc[key] = fields[key][fieldAddress];
    return acc;
  }, {});
};

const parseDate = (raw: string) => {
  const splitted = raw.split("/");
  return `${splitted[2]}-${splitted[1]}-${splitted[0]}`;
};

export const formatAllFieldValues = (
  fields: TFields,
  values: Record<string, string>
) => {
  return Object.keys(fields).reduce(
    (acc: Record<string, TFieldFormattedValue>, key) => {
      switch (fields[key].type) {
        case "number":
          acc[key] = parseInt(values[key]);
          break;
        case "date":
          acc[key] = parseDate(values[key]);
          break;
        default:
          acc[key] = values[key];
      }
      return acc;
    },
    {}
  );
};
