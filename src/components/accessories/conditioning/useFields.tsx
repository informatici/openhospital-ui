import { ConditioningDTO } from "generated";
import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "libraries/formDataHandling/types";
import { ConditioningFormFieldName } from "./conditioningForm/types";
import { initialFields } from "./consts";

export const useFields = (conditioning?: ConditioningDTO) => {
  const fields: TFields<ConditioningFormFieldName> = {
    ...initialFields,
    aspiration: {
      value: conditioning?.aspiration ? "true" : "false",
      type: "boolean",
    },
    cpap: {
      value: conditioning?.cpap ? "true" : "false",
      type: "boolean",
    },
    mce: {
      value: conditioning?.mce?.toString() ?? "",
      type: "number",
    },
    ventilation: {
      value: conditioning?.ventilation?.toString() ?? "",
      type: "number",
    },
    oxygenDebit: {
      value: conditioning?.oxygenDebit?.toString() ?? "",
      type: "number",
    },
    sgVolume: {
      value: conditioning?.sgVolume?.toString() ?? "",
      type: "number",
    },
    diazepamDose: {
      value: conditioning?.diazepamDose?.toString() ?? "",
      type: "number",
    },
    bolusSsVolume: {
      value: conditioning?.bolusSsVolume?.toString() ?? "",
      type: "number",
    },
    sngNumber: {
      value: conditioning?.sngNumber ?? "",
      type: "text",
    },
    others: {
      value: conditioning?.others ?? "",
      type: "text",
    },
    performedAt: {
      value: parseDateTime(conditioning?.performedAt.toString()!, false),
      type: "date",
    },
    malaria: {
      value: conditioning?.malaria ?? "",
      type: "text",
    },
    conditionAtAdmission: {
      value: conditioning?.conditionAtAdmission ?? [],
      type: "array",
    },
    bloodGlucoseLevel: {
      value: conditioning?.bloodGlucoseLevel?.toString() ?? "",
      type: "number",
    },
    performedBy: {
      value: conditioning?.performedBy?.userName ?? "",
      type: "text",
    },
  };

  return fields;
};
