import { TFields } from "../../../../../libraries/formDataHandling/types";
import { VaccineFormFieldName } from ".";
import { VaccineDTO } from "../../../../../generated";

export const getInitialFields: (
  vaccine: VaccineDTO | undefined
) => TFields<VaccineFormFieldName> = (vaccine) => ({
  code: { type: "text", value: vaccine?.code ?? "" },
  description: { type: "text", value: vaccine?.description ?? "" },
  vaccineType: { type: "text", value: vaccine?.vaccineType?.code ?? "" },
});
