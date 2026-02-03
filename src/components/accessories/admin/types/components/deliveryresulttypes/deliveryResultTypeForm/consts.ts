import { DeliveryResultTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";
import { DeliveryResultTypeFormFieldName } from "./types";

export const getInitialFields: (
  diseaseType: DeliveryResultTypeDTO | undefined
) => TFields<DeliveryResultTypeFormFieldName> = (diseaseType) => ({
  code: { type: "text", value: diseaseType?.code ?? "" },
  description: { type: "text", value: diseaseType?.description ?? "" },
});
