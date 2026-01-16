import type { PatientDTO } from '../../../generated';
import type { TUserCredentials } from '../../../state/main/types';
import type { ApiResponse } from '../../../state/types';

export interface IStateProps {
	userCredentials: TUserCredentials;
	isLoading: boolean;
	hasSucceeded: boolean;
	hasFailed: boolean;
	patient: ApiResponse<PatientDTO>;
}

export type TActivityTransitionState =
	| 'IDLE'
	| 'TO_KEEP_EDITING'
	| 'TO_PATIENT'
	| 'TO_DASHBOARD';
