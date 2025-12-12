import type { VisitDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IVisitState = {
	getVisits: ApiResponse<Array<VisitDTO>>;
	createVisit: ApiResponse<VisitDTO>;
	updateVisit: ApiResponse<VisitDTO>;
	deleteVisit: ApiResponse<void>;
};
