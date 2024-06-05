import { TFields } from "../../../../../libraries/formDataHandling/types";
import { DiseaseFormFieldName } from ".";
import { DiseaseDTO } from "../../../../../generated";

export const getInitialFields: (
  disease: DiseaseDTO | undefined
) => TFields<DiseaseFormFieldName> = (disease) => ({
  code: { type: "text", value: disease?.code ?? "" },
  description: { type: "text", value: disease?.description ?? "" },
  diseaseType: { type: "text", value: disease?.diseaseType?.code ?? "" },
  opdInclude: {
    type: "boolean",
    value: disease?.opdInclude ? "true" : "false",
  },
  ipdInInclude: {
    type: "boolean",
    value: disease?.ipdInInclude ? "true" : "false",
  },
  ipdOutInclude: {
    type: "boolean",
    value: disease?.ipdOutInclude ? "true" : "false",
  },
});
