import { ExamTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IExamTypesState = {
  getAll: ApiResponse<Array<ExamTypeDTO>>;
  create: ApiResponse<ExamTypeDTO>;
  update: ApiResponse<ExamTypeDTO>;
  delete: ApiResponse<boolean>;
};
