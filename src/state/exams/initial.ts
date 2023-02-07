import { ExamDTO, ExamRowDTO } from "../../generated";
import { IExamState } from "./types";

export const initial: IExamState = {
  examList: { status: "IDLE", data: new Array<ExamDTO>() },
  examRowsByExamCode: { status: "IDLE", data: new Array<ExamRowDTO>() },
};
