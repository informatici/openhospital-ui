import { TFields } from "../../../libraries/formDataHandling/types";
import { EncounterFormFieldName } from "./encountersForm/types";

export const initialFields: TFields<EncounterFormFieldName> = {
  code: {
    value: "",
    type: "text",
  },
  performedAt: {
    value: "",
    type: "date",
  },
};
