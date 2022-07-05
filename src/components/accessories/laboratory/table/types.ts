import { number } from "yup";
import { LaboratoryDTO, LaboratoryForPrintDTO } from "../../../../generated";

export interface IExamTableProps {
  data: LaboratoryForPrintDTO[];
  handleEdit?: (row: LaboratoryForPrintDTO) => void;
  handleDelete?: (code: number | undefined) => void;
}
