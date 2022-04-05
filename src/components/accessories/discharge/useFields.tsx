import { AdmissionDTO } from "../../../generated";
import { differenceInDays } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";
import { initialFields } from "./consts";

export const useFields = (admission?: AdmissionDTO) => {
  const fields: TFields<DischargeFormFieldName> = {
    ...initialFields,
    disType: {
      value: admission?.admType?.code ?? "",
      type: "text",
    },
    diseaseOut: {
      value: admission?.diseaseOut?.code?.toString() ?? "",
      type: "text",
    },
    bedDays: {
      value: differenceInDays(
        new Date(admission?.admDate ?? ""),
        new Date()
      ).toString(),
      type: "number",
    },
  };

  return fields;
};
