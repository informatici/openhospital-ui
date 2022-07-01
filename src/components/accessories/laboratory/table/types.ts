import { number } from "yup";
import { LaboratoryDTO, LaboratoryForPrintDTO } from "../../../../generated";

export interface IExamTableProps {
  data: LaboratoryForPrintDTO[];
}
