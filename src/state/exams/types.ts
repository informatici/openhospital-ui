import { ExamDTO, ExamRowDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IExamState = {
  examList: ApiResponse<Array<ExamDTO>>;
  examRowsByExamCode: ApiResponse<Array<ExamRowDTO>>;
};
