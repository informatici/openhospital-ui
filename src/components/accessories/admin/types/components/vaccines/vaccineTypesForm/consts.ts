import { VaccineTypeFormFieldName } from ".";
import { VaccineTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  vaccineType: VaccineTypeDTO | undefined
) => TFields<VaccineTypeFormFieldName> = (vaccineType) => ({
  code: { type: "text", value: vaccineType?.code ?? "" },
  description: { type: "text", value: vaccineType?.description ?? "" },
});
