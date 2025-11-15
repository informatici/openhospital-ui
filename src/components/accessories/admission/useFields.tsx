import { AdmissionDTO, DiseaseDTO } from "../../../generated";
import {
  differenceInDays,
  parseDateTime,
} from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { AdmissionFormFieldName } from "./admissionForm/types";
import { initialFields } from "./consts";

export const useFields = (
  admission?: AdmissionDTO,
  lastOPDDisease?: DiseaseDTO
) => {
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
      value:
        admission?.diseaseIn?.code?.toString() ??
        lastOPDDisease?.code?.toString() ??
        "",
      type: "text",
    },
    admDate: {
      value: admission?.admDate ?? parseDateTime(Date.now().toString(), false),
      type: "date",
    },
    anamnesis: {
      value: admission?.anamnesis ?? "",
      type: "text",
    },
    transUnit: {
      value: admission?.transUnit?.toString() ?? "",
      type: "number",
    },
    fhu: {
      value: admission?.fhu ?? "",
      type: "text",
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
    preTreatment: {
      value: admission?.preTreatment ?? "",
      type: "text",
    },
    preAssessment: {
      value: admission?.preAssessment ?? "",
      type: "text",
    },
    entryReason: {
      value: admission?.entryReason ?? "",
      type: "text",
    },
    alertReceived: {
      value: admission?.alertReceived ? "true" : "false",
      type: "boolean",
    },
    referenceSheet: {
      value: admission?.referenceSheet ? "true" : "false",
      type: "boolean",
    },
    qualifiedAgent: {
      value: admission?.qualifiedAgent ? "true" : "false",
      type: "boolean",
    },
    transportation: {
      value: admission?.transportation ?? "",
      type: "text",
    },
    physicalExam: {
      value: admission?.physicalExam ?? "",
      type: "text",
    },
  };

  return fields;
};
