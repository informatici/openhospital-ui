import { ExamTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IExamTypeState = {
  getExamTypes: ApiResponse<Array<ExamTypeDTO>>;
};
