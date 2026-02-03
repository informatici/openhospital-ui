import { OperationTypeFormFieldName } from ".";
import { OperationTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  operaationType: OperationTypeDTO | undefined
) => TFields<OperationTypeFormFieldName> = (operaationType) => ({
  code: { type: "text", value: operaationType?.code ?? "" },
  description: { type: "text", value: operaationType?.description ?? "" },
});
