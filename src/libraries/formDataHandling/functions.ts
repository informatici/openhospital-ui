import { produce } from "immer";
import moment from "moment";
import { MedicalDTO, PatientDTO, TherapyRowDTO } from "../../generated";
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
  let unformatDate = "";
  if (moment(+raw).isValid()) {
    unformatDate = moment(+raw)
      .toDate()
      .toString();
  } else {
    unformatDate = moment(raw).toDate().toString();
  }

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

export const updateTherapyFields = (
  fields: TFields,
  values: TherapyRowDTO | undefined
): TFields => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      if (draft[key as string]) {
        let value = values![key as keyof TherapyRowDTO];
        return (draft[key as string].value =
          typeof value === "object" ? (value as MedicalDTO).code : value);
      }
    });
  });
};
