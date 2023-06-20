import { LaboratoryDTO, LabWithRowsDTO } from "../../../../generated";

export interface IExamTableProps {
  data: LabWithRowsDTO[];
  handleEdit?: (row: LaboratoryDTO) => void;
  handleDelete?: (code: number | undefined) => void;
}

export const multipleResultsLabel = "angal.lab.multipleresults.txt";
