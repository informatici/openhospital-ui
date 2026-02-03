import { ExamDTO, ExamRowDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IExamState = {
  examList: ApiResponse<Array<ExamDTO>>;
  examCreate: ApiResponse<ExamDTO>;
  examUpdate: ApiResponse<ExamDTO>;
  examDelete: ApiResponse<boolean>;
  examRowsByExamCode: ApiResponse<Array<ExamRowDTO>>;
};
