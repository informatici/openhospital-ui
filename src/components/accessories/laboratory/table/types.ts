import { number } from "yup";
import { LaboratoryForPrintDTO } from "../../../../generated";
import { LaboratoryForPrintWithRows } from "../../../../state/laboratories/types";

export interface IExamTableProps {
  data: LaboratoryForPrintWithRows[];
  handleEdit?: (row: LaboratoryForPrintDTO) => void;
  handleDelete?: (code: number | undefined) => void;
}

export const multipleResultsLabel = "angal.lab.multipleresults.txt";
