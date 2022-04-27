import { TFields } from "../../../libraries/formDataHandling/types";
import { TFieldName } from "./types";

export const initialFields: TFields<TFieldName> = {
  id: {
    value: "",
    type: "text",
  },
  firstName: {
    value: "",
    type: "text",
  },
  secondName: {
    value: "",
    type: "text",
  },
  birthDate: {
    value: "",
    type: "date",
  },
  address: {
    value: "",
    type: "text",
  },
};
