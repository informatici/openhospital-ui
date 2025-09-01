import { parseDateTime } from "libraries/formDataHandling/functions";
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
    date: {
      value: encounter?.date ? parseDateTime(encounter.date) : new Date().toISOString(),
      type: "date",
    },
  };

  return fields;
};
