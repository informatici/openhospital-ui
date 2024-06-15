import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";
import { PregnantTreatmentTypeFormFieldName } from "./types";

export const getInitialFields: (
  pregnantTreatmentType: PregnantTreatmentTypeDTO | undefined
) => TFields<PregnantTreatmentTypeFormFieldName> = (pregnantTreatmentType) => ({
  code: { type: "text", value: pregnantTreatmentType?.code ?? "" },
  description: {
    type: "text",
    value: pregnantTreatmentType?.description ?? "",
  },
});
