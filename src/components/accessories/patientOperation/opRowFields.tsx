import { AdmissionDTO, OperationRowDTO } from "../../../generated";
import { parseDate } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { initialFields } from "./consts";
import { OperationRowFormFieldName } from "./operationForm/types";

export const opRowFields = (opRow?: Partial<OperationRowDTO>) => {
  const fields: TFields<OperationRowFormFieldName> = {
    ...initialFields,
    opDate: {
      value: opRow?.opDate ?? parseDate(Date.now().toString()),
      type: "date",
    },
    opResult: {
      value: opRow?.opResult ?? "",
      type: "text",
    },
    transUnit: {
      value: opRow?.transUnit?.toString() ?? "",
      type: "text",
    },
    remarks: {
      value: opRow?.remarks ?? "",
      type: "text",
    },
    operation: {
      value: opRow?.operation?.code ?? "",
      type: "text",
    },
  };

  return fields;
};
