import { format } from "date-fns";
import { SummaryFieldType } from "./SummaryFieldType";

export const convertToSummaryData = (
  data: Array<any>,
  field: SummaryFieldType
) => {
  const res = data.map(({ ...rest }) => ({
    type: field.type,
    date: format(new Date(rest[field.dateField]), "yyyy-MM-dd"),
    note: field.noteField ? rest[field.noteField] : "",
    result: "",
  }));
  return res;
};
