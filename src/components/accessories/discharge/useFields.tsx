import { AdmissionDTO } from "../../../generated";
import { differenceInDays } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";
import { initialFields } from "./consts";

export const useFields = (admission?: AdmissionDTO) => {
  const fields: TFields<DischargeFormFieldName> = {
    ...initialFields,
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
    bedDays: {
      value: differenceInDays(
        new Date(admission?.admDate ?? ""),
        new Date()
      ).toString(),
      type: "number",
    },
    note: {
      value: admission?.note ?? "",
      type: "text",
    },
  };

  return fields;
};
