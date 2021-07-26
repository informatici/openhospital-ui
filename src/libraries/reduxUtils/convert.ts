import moment from "moment";
import { SummaryFieldType } from "./SummaryFieldType";

export const convertToSummaryData = (
  data: Array<any>,
  field: SummaryFieldType
) => {
  const res = data.map(({ ...rest }) => ({
    type: field.type,
    date: moment(rest[field.dateField]).format("DD/MM/YYYY"),
    note: field.noteField ? rest[field.noteField] : "",
    result: "",
  }));
  return res;
};
