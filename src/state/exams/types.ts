import { ExamDTO, ExamRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IExamState = {
  examList: IApiResponse<Array<ExamDTO>>;
  examRowsByExamCode: IApiResponse<Array<ExamRowDTO>>;
};
