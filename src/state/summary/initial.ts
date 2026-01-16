import { ApiResponse } from '../types';
import type { ISummaryState, SummaryDataType } from './types';

export const initial: ISummaryState = {
	summaryApisCall: new ApiResponse({
		data: [] as SummaryDataType[],
		status: 'IDLE',
	}),
};
