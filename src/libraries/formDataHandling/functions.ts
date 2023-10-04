import { produce } from "immer";
import moment from "moment";
import { IFormCustomizationProps } from "../../customization/formCustomization/type";
import {
  AdmissionDTO,
  AgeTypeDTO,
  DiseaseDTO,
  ExamDTO,
  LaboratoryDTO,
  OpdDTO,
  OperationDTO,
  OperationRowDTO,
  PatientDTO,
  PatientExaminationDTO,
  TherapyRowDTO,
  VisitDTO,
  WardDTO,
} from "../../generated";
import { TFieldAddress, TFieldFormattedValue, TFields } from "./types";
import {
  TAgeFieldName,
  TAgeType,
} from "../../components/accessories/patientDataForm/types";

export const getFromFields = (
  fields: TFields,
  fieldAddress: TFieldAddress
): Record<string, any> => {
  return Object.keys(fields).reduce((acc: Record<string, any>, key) => {
    acc[key] = fields[key][fieldAddress];
    return acc;
  }, {});
};

export const parseDate = (raw: string, withTimezone: boolean = true) => {
  if (raw) {
    var date = isNaN(+raw) ? new Date(raw) : new Date(+raw);
    if (withTimezone) {
      const timezonedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      timezonedDate.setUTCHours(0);
      return timezonedDate.toISOString();
    }
    date.setUTCHours(0);
    return date.toISOString();
  } else {
    return "";
  }
};

export const fixFilterDateFrom = (date: string | Date): string => {
  let dateFrom: string;

  if (typeof date === "string") {
    date = new Date(date);
  }

  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);

  dateFrom = date.toISOString();

  return dateFrom;
};

export const removeTime = (date: string | Date): string => {
  if (date instanceof Date) {
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);

    date = date.toISOString();
  }

  return date.split("T")[0];
};

export const fixFilterDateTo = (date: string | Date): string => {
  let dateTo: string;

  if (typeof date === "string") {
    date = new Date(date);
  }

  date.setUTCHours(23);
  date.setUTCMinutes(59);
  date.setUTCSeconds(0);

  dateTo = date.toISOString();

  return dateTo;
};

export const formatAllFieldValues = (
  fields: TFields,
  values: Record<string, string>,
  withTimezone: boolean = true
): Record<string, TFieldFormattedValue> => {
  return Object.keys(fields).reduce(
    (acc: Record<string, TFieldFormattedValue>, key) => {
      switch (fields[key].type) {
        case "number":
          acc[key] = parseInt(values[key]);
          break;
        case "date":
          acc[key] = parseDate(values[key], withTimezone);
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
    Object.keys(values ?? {}).forEach((key) => {
      if (draft[key as string]) {
        return (draft[key as string].value = values![key as keyof PatientDTO]);
      }
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
        return (draft[key as string].value =
          values![key as keyof TherapyRowDTO]);
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
      if (key === "result") {
        return (draft[key as string].value = value);
      }
      if (draft[key as string]) {
        return (draft[key as string].value =
          typeof value === "object"
            ? (value as ExamDTO)?.code ?? ""
            : moment(value).isValid()
            ? parseDate(value as string)
            : value);
      }
    });
  });
};
export const updateFilterFields = (
  fields: TFields,
  values: any,
  withTimezone: boolean = true
): TFields => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      let value = values![key];
      if (key === "status") return (draft[key as string].value = value);
      if (key === "patientCode") return (draft[key as string].value = value);
      if (draft[key as string]) {
        return (draft[key as string].value = moment(value).isValid()
          ? parseDate(value as string, withTimezone)
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
      if (
        ["pex_diuresis_desc", "pex_bowel_desc", "pex_auscultation"].includes(
          key
        )
      ) {
        return (draft[key as string].value = (
          (value ?? "") as string
        ).toLowerCase());
      }
      if (draft[key as string]) {
        return (draft[key as string].value = parseFloat(value as string)
          ? value
          : moment(value).isValid()
          ? parseDate(value as string)
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
            ? (value as DiseaseDTO)?.code ?? ""
            : moment(value).isValid()
            ? parseDate(value as string)
            : value);
      }
    });
  });
};

export const updateVisitFields = (
  fields: TFields,
  values: VisitDTO | undefined
) => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      if (draft[key as string]) {
        const value = values![key as keyof VisitDTO];
        if (key === "ward")
          return (draft[key as string].value =
            (value as WardDTO)?.code?.toString() ?? "");

        if (key === "patient")
          return (draft[key as string].value =
            (value as PatientDTO)?.code?.toString() ?? "");

        if (key === "duration")
          return (draft[key as string].value = value ?? "");

        return (draft[key as string].value =
          typeof value === "object"
            ? (key === "patient"
                ? (value as PatientDTO)?.code?.toString()
                : (value as WardDTO)?.code?.toString()) ?? ""
            : typeof value == "boolean"
            ? value
            : moment(value).isValid()
            ? parseDate(value as string)
            : value);
      }
    });
  });
};

export const updateOperationRowFields = (
  fields: TFields,
  values: OperationRowDTO | undefined
) => {
  return produce(fields, (draft: Record<string, any>) => {
    Object.keys(values!).forEach((key) => {
      if (draft[key as string]) {
        const value = values![key as keyof OperationRowDTO];

        if (key === "admission")
          return (draft[key as string].value =
            (value as AdmissionDTO)?.id?.toString() ?? "");

        if (key === "transUnit") return (draft[key as string].value = value);

        return (draft[key as string].value =
          typeof value === "object"
            ? (key === "operation"
                ? (value as OperationDTO)?.code?.toString()
                : (value as OpdDTO)?.code?.toString()) ?? ""
            : typeof value == "boolean"
            ? value
            : moment(value).isValid()
            ? parseDate(value as string)
            : value);
      }
    });
  });
};

export const differenceInDays = (dateFrom: Date, dateTo: Date) => {
  return moment(dateTo)
    .startOf("day")
    .diff(moment(dateFrom).startOf("day"), "days");
};

export const differenceInSeconds = (dateFrom: Date, dateTo: Date) => {
  return moment(dateTo).diff(moment(dateFrom), "ms");
};

export const isFieldSuggested = (
  formCustomization: IFormCustomizationProps,
  fieldName: string
) => {
  return formCustomization.suggestedFields.includes(fieldName);
};

export const getBirthDateAndAge = (
  ageType: TAgeFieldName,
  values: TAgeType,
  allAgeTypes?: AgeTypeDTO[] | undefined
): { birthDate: string; age: number } => {
  let ageAndBirthDate: { birthDate: string; age: number };

  switch (ageType) {
    case "agetype":
      let selectedAgeType = allAgeTypes?.find(
        (at, i) => at.code == values.agetype
      );

      if (selectedAgeType != undefined) {
        let averageAge = Math.round(
          selectedAgeType.from && selectedAgeType.to
            ? (selectedAgeType.from + selectedAgeType.to) / 2
            : 0
        );

        let birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - averageAge);

        ageAndBirthDate = {
          birthDate: birthDate.toISOString(),
          age: averageAge,
        };
      } else {
        ageAndBirthDate = { birthDate: new Date().toISOString(), age: 0 };
      }
      break;

    case "birthDate":
      let birthDate = values.birthDate
        ? new Date(values.birthDate)
        : new Date();
      let timeDiff = Math.abs(Date.now() - birthDate.getTime());
      let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

      ageAndBirthDate = { birthDate: birthDate.toISOString(), age: age };
      break;

    case "age":
      let birthdate = new Date();
      birthdate.setFullYear(birthdate.getFullYear() - (values.age ?? 0));

      ageAndBirthDate = {
        birthDate: birthdate.toISOString(),
        age: values.age ?? 0,
      };
      break;

    default:
      // return current date if unable to determine the selected age type
      ageAndBirthDate = { birthDate: new Date().toISOString(), age: 0 };
      break;
  }

  return ageAndBirthDate;
};
