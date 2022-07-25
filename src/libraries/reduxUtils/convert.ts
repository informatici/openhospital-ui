import {
  AdmissionDTO,
  LaboratoryDTO,
  MedicalDTO,
  OpdDTO,
  OperationRowDTO,
  PatientExaminationDTO,
  TherapyRowDTO,
} from "../../generated";
import { renderDate } from "../formatUtils/dataFormatting";
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
  data: Array<
    | PatientExaminationDTO
    | OpdDTO
    | LaboratoryDTO
    | AdmissionDTO
    | OperationRowDTO
  >,
  dateFields: string[],
  labels: any,
  medicals: MedicalDTO[] = []
) => {
  const itemRender = (item: any) => {
    const obj: any = {};
    Object.keys(labels).forEach((field: string) => {
      if (typeof item[field] === "object") {
        obj[field] = item[field]?.description ?? "";
      } else if (dateFields.includes(field) && item[field]) {
        obj[field] = renderDate(item[field]);
      } else if (field === "medicalId" && item[field]) {
        obj[field] =
          medicals.find((medoc) => medoc.code === item[field])?.description ??
          item[field];
      } else if (item[field]) {
        obj[field] = item[field];
      }
      return obj[field];
    });
    return obj;
  };
  return data.map((item: any) => {
    return itemRender(item);
  });
};
