import { TFields } from "../../../libraries/formDataHandling/types";
import { BillFilterFormFieldName } from "../../accessories/billFilterForm/types";
import { PaymentsFilterFormFieldName } from "../../accessories/paymentsTable/types";

export const FilterBillsInitialFields: TFields<BillFilterFormFieldName> = {
  patientCode: {
    value: "",
    type: "text",
  },
  fromDate: {
    value: new Date().setDate(new Date().getDate() - 6).toString(),
    type: "date",
  },
  toDate: {
    value: new Date().getTime().toString(),
    type: "date",
  },

  status: {
    value: "ALL",
    type: "text",
  },
};

export const paymentsFilterInitialFields: TFields<PaymentsFilterFormFieldName> =
  {
    patientCode: {
      value: "",
      type: "text",
    },
    fromDate: {
      value: new Date().setDate(new Date().getDate() - 6).toString(),
      type: "date",
    },
    toDate: {
      value: new Date().getTime().toString(),
      type: "date",
    },
  };
