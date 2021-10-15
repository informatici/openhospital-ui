import { produce } from "immer";
import moment from "moment";
import {
  DiseaseDTO,
  ExamDTO,
  LaboratoryDTO,
  OpdDTO,
  PatientDTO,
  PatientExaminationDTO,
} from "../../generated";
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

export const parseDate = (raw: string) => {
  return raw ? new Date(raw).toISOString() : "";
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
      if (draft[key as string]) {
        return (draft[key as string].value = values![key as keyof PatientDTO]);
      }
    });
  });
};

export const updateLabFields = (
  fields: TFields,
  values: LaboratoryDTO | undefined
): TFields => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      let value = values![key as keyof LaboratoryDTO];
      if (draft[key as string]) {
        return (draft[key as string].value =
          typeof value === "object"
            ? (value as ExamDTO)?.code ?? ""
            : moment(value).isValid()
            ? Date.parse(moment(value).toString())
            : value);
      }
    });
  });
};
export const updateTriageFields = (
  fields: TFields,
  values: PatientExaminationDTO | undefined
): TFields => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      let value = values![key as keyof PatientExaminationDTO];
      if (draft[key as string]) {
        return (draft[key as string].value = moment(value).isValid()
          ? Date.parse(moment(value).toString())
          : value);
      }
    });
  });
};
export const updateOpdFields = (
  fields: TFields,
  values: OpdDTO | undefined
) => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      if (draft[key as string]) {
        const value = values![key as keyof OpdDTO];
        return (draft[key as string].value =
          typeof value === "object"
            ? (value as DiseaseDTO)?.code?.toString() ?? ""
            : moment(value).isValid()
            ? Date.parse(moment(value).toString())
            : value);
      }
    });
  });
};

export const differenceInDays = (dateFrom: Date, dateTo: Date) => {
  return moment(dateTo).diff(moment(dateFrom), "days");
};
