import { TFields } from "../../../../../libraries/formDataHandling/types";
import { WardFormFieldName } from ".";
import { WardDTO } from "../../../../../generated";

export const getInitialFields: (
  ward: WardDTO | undefined
) => TFields<WardFormFieldName> = (ward) => ({
  code: { type: "text", value: ward?.code ?? "" },
  description: { type: "text", value: ward?.description ?? "" },
  beds: { type: "number", value: ward?.beds ? `${ward?.beds}` : "0" },
  nurs: { type: "text", value: ward?.nurs ? `${ward?.nurs}` : "0" },
  docs: { type: "text", value: ward?.docs ? `${ward?.docs}` : "0" },
  opd: { type: "text", value: ward?.opd ? "true" : "false" },
  pharmacy: { type: "text", value: ward?.pharmacy ? "true" : "false" },
  male: { type: "text", value: ward?.male ? "true" : "false" },
  female: { type: "text", value: ward?.female ? "true" : "false" },
  email: { type: "text", value: ward?.email ?? "" },
  telephone: { type: "text", value: ward?.telephone ?? "" },
  fax: { type: "text", value: ward?.fax ?? "" },
  visitDuration: {
    type: "number",
    value: ward?.visitDuration ? `${ward?.visitDuration}` : "0",
  },
});
