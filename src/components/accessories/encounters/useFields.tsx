import { EncounterDTO } from "generated";
import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { initialFields } from "./consts";
import { EncounterFormFieldName } from "./encountersForm/types";

export const useFields = (encounter?: EncounterDTO) => {
  const fields: TFields<EncounterFormFieldName> = {
    ...initialFields,
    code: {
      value: encounter?.code ?? "",
      type: "text",
    },
    performedAt: {
      value: encounter?.performedAt
        ? parseDateTime(encounter.performedAt.toString()!, false)
        : new Date().toISOString(),
      type: "date",
    },
  };

  return fields;
};
