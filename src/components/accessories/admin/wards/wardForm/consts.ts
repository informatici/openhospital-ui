import { TFields } from "../../../../../libraries/formDataHandling/types";
import { WardFormFieldName } from ".";

export const initialFields: TFields<WardFormFieldName> = {
  code: { type: "text", value: "" },
  description: { type: "text", value: "" },
  beds: { type: "number", value: "0" },
  nurs: { type: "text", value: "0" },
  docs: { type: "text", value: "0" },
  opd: { type: "text", value: "false" },
  pharmacy: { type: "text", value: "false" },
  male: { type: "text", value: "false" },
  female: { type: "text", value: "false" },
  email: { type: "text", value: "" },
  telephone: { type: "text", value: "" },
  fax: { type: "text", value: "" },
  visitDuration: { type: "number", value: "0" },
};
