import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { BillFilterFormFieldName } from "../../accessories/billTable/types";

import { PaymentsFilterFormFieldName } from "../../accessories/paymentsTable/types";

export const FilterBillsInitialFields: TFields<BillFilterFormFieldName> = {
  patientCode: {
    value: "",
    type: "text",
  },
  fromDate: {
    value: moment().add(-6, "days").toISOString(),
    type: "date",
  },
  toDate: {
    value: moment().toISOString(),
    type: "date",
  },
  status: {
    value: "ALL",
    type: "text",
  },
  month: {
    value: "",
    type: "date",
  },
  year: {
    value: "",
    type: "date",
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
