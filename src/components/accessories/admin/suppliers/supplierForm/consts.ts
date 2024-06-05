import { TFields } from "../../../../../libraries/formDataHandling/types";
import { SupplierFormFieldName } from ".";
import { SupplierDTO } from "../../../../../generated";

export const getInitialFields: (
  supplier: SupplierDTO | undefined
) => TFields<SupplierFormFieldName> = (supplier) => ({
  supId: { type: "number", value: `${supplier?.supId}` ?? "" },
  supName: { type: "text", value: supplier?.supName ?? "" },
  supAddress: {
    type: "text",
    value: supplier?.supAddress ? supplier?.supAddress : "",
  },
  supEmail: {
    type: "text",
    value: supplier?.supEmail ? supplier?.supEmail : "",
  },
  supFax: { type: "text", value: supplier?.supFax ? supplier?.supFax : "" },
  supTaxcode: {
    type: "text",
    value: supplier?.supTaxcode ? supplier?.supTaxcode : "",
  },
  supPhone: {
    type: "text",
    value: supplier?.supPhone ? supplier?.supPhone : "",
  },
  supNote: { type: "text", value: supplier?.supNote ? supplier?.supNote : "" },
});
