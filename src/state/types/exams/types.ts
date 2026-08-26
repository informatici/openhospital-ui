import type { ExamTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IExamTypesState = {
	getAll: ApiResponse<Array<ExamTypeDTO>>;
	create: ApiResponse<ExamTypeDTO>;
	update: ApiResponse<ExamTypeDTO>;
	delete: ApiResponse<boolean>;
};
