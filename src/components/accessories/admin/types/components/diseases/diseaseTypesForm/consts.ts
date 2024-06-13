import { DiseaseTypeFormFieldName } from ".";
import { DiseaseTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  diseaseType: DiseaseTypeDTO | undefined
) => TFields<DiseaseTypeFormFieldName> = (diseaseType) => ({
  code: { type: "text", value: diseaseType?.code ?? "" },
  description: { type: "text", value: diseaseType?.description ?? "" },
});
