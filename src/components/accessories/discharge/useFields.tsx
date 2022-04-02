import { AdmissionDTO } from "../../../generated";
import { differenceInDays } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { AdmissionFormFieldName } from "./dischargeForm/types";
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
      value: admission?.admDate ?? "",
      type: "date",
    },
    note: {
      value: admission?.note ?? "",
      type: "text",
    },
    bedDays: {
      value: differenceInDays(
        new Date(+(admission?.admDate ?? "")),
        new Date()
      ).toString(),
      type: "number",
    },
    transUnit: {
      value: admission?.transUnit?.toString() ?? "",
      type: "text",
    },
  };

  return fields;
};
