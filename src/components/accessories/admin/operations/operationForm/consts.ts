import { TFields } from "../../../../../libraries/formDataHandling/types";
import { OperationFormFieldName } from ".";
import { OperationDTO } from "../../../../../generated";

export const getInitialFields: (
  operation: OperationDTO | undefined
) => TFields<OperationFormFieldName> = (operation) => ({
  code: { type: "text", value: operation?.code ?? "" },
  description: { type: "text", value: operation?.description ?? "" },
  type: { type: "text", value: operation?.type?.code ?? "" },
  major: {
    type: "number",
    value: `${operation?.major ?? 1}`,
  },
});
