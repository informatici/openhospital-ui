import { format } from "date-fns";
import moment from "moment";
import { MedicalDTO } from "../../generated";
import { SummaryFieldType } from "./SummaryFieldType";

export const convertToSummaryData = (
  data: Array<any>,
  field: SummaryFieldType
) => {
  const res = data.map(({ ...rest }) => ({
    ...rest,
    type: field.type,
    date: rest[field.dateField],
  }));
  return res;
};

export const renderSummary = (
  data: Array<any>,
  dateFields: string[],
  labels: any,
  medicals: MedicalDTO[]
) => {
  const itemRender = (item: any) => {
    const obj: any = {};
    Object.keys(labels).map((field: string) => {
      if (typeof item[field] === "object") {
        obj[field] = item[field].description ?? "";
      } else if (dateFields.includes(field) && item[field]) {
        obj[field] = format(new Date(+item[field]), "dd/MM/yyyy");
      } else if (field === "medicalId") {
        obj[field] =
          medicals.find((medoc) => medoc.code === item[field])?.description ??
          item[field];
      } else {
        obj[field] = item[field];
      }
    });
    return obj;
  };
  return data.map((item: any) => {
    return itemRender(item);
  });
};
