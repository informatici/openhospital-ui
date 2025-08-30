import { DiseaseDTO, EncounterDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { initialFields } from "./consts";
import { EncounterFormFieldName } from "./encountersForm/types";

export const useFields = (
  encounter?: EncounterDTO,
  lastOPDDisease?: DiseaseDTO
) => {
  const fields: TFields<EncounterFormFieldName> = {
    ...initialFields,
    code: {
      value: encounter?.code ?? "",
      type: "text",
    },
    createdDate: {
      value: encounter?.createdDate ? new Date(encounter.createdDate).toISOString() : new Date().toISOString(),
      type: "date",
    },
  };

  return fields;
};
