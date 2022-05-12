import { AdmissionDTO } from "../../../generated";
import {
  differenceInDays,
  parseDate,
} from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { AdmissionFormFieldName } from "./admissionForm/types";
import { initialFields } from "./consts";

export const useFields = (admission?: AdmissionDTO) => {
  const fields: TFields<AdmissionFormFieldName> = {
    ...initialFields,
    ward: {
      value: admission?.ward?.code ?? "",
      type: "text",
    },
    admType: {
      value: admission?.admType?.code ?? "",
      type: "text",
    },
    diseaseIn: {
      value: admission?.diseaseIn?.code?.toString() ?? "",
      type: "text",
    },
    admDate: {
      value: admission?.admDate ?? parseDate(Date.now().toString()),
      type: "date",
    },
    note: {
      value: admission?.note ?? "",
      type: "text",
    },
    transUnit: {
      value: admission?.transUnit?.toString() ?? "",
      type: "number",
    },
    disType: {
      value: admission?.disType?.code ?? "",
      type: "text",
    },
    diseaseOut1: {
      value: admission?.diseaseOut1?.code?.toString() ?? "",
      type: "text",
    },
    diseaseOut2: {
      value: admission?.diseaseOut2?.code?.toString() ?? "",
      type: "text",
    },
    diseaseOut3: {
      value: admission?.diseaseOut3?.code?.toString() ?? "",
      type: "text",
    },
    disDate: {
      value: admission?.disDate ?? "",
      type: "date",
    },
    bedDays: {
      value:
        admission?.admitted === 1
          ? differenceInDays(
              new Date(admission?.admDate ?? ""),
              new Date()
            ).toString()
          : differenceInDays(
              new Date(admission?.admDate ?? ""),
              new Date(admission?.disDate ?? "")
            ).toString(),
      type: "number",
    },
  };

  return fields;
};
