import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFilterFormFieldName } from "./filter/types";

export const initialFilterFields: TFields<ExamFilterFormFieldName> = {
  dateFrom: { type: "date", value: "" },
  dateTo: { type: "date", value: "" },
  examName: { type: "text", value: "" },
};
