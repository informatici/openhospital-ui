import type { ExamDTO, ExamRowDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IExamState = {
	examList: ApiResponse<Array<ExamDTO>>;
	examCreate: ApiResponse<ExamDTO>;
	examUpdate: ApiResponse<ExamDTO>;
	examDelete: ApiResponse<boolean>;
	examRowsByExamCode: ApiResponse<Array<ExamRowDTO>>;
};
