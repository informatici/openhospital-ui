import { ExamTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IExamTypeState = {
  getExamTypes: IApiResponse<Array<ExamTypeDTO>>;
};
