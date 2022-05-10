import { AdmissionDTO } from "../../../generated";
import { parseDate } from "../../../libraries/formDataHandling/functions";
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
      type: "text",
    },
  };

  return fields;
};
