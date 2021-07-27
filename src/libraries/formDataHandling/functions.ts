import { produce } from "immer";
import { PatientDTO } from "../../generated";
import { TFieldAddress, TFieldFormattedValue, TFields } from "./types";

export const getFromFields = (
  fields: TFields,
  fieldAddress: TFieldAddress
): Record<string, any> => {
  return Object.keys(fields).reduce((acc: Record<string, any>, key) => {
    acc[key] = fields[key][fieldAddress];
    return acc;
  }, {});
};

const parseDate = (raw: string) => {
  const unformatDate = new Date(+raw).toString();
  return raw ? Date.parse(unformatDate).toString() : "";
};

export const formatAllFieldValues = (
  fields: TFields,
  values: Record<string, string>
): Record<string, TFieldFormattedValue> => {
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

export const updateFields = (
  fields: TFields,
  values: PatientDTO | undefined
): TFields => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      if (draft[key as string])
        return (draft[key as string].value = values![key as keyof PatientDTO]);
    });
  });
};
