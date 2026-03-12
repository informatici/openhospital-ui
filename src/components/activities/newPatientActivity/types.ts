import type { TUserCredentials } from '../../../state/main/types';

export interface IStateProps {
	userCredentials: TUserCredentials;
	isLoading: boolean;
	hasSucceeded: boolean;
	hasFailed: boolean;
}

export type TActivityTransitionState =
	| 'IDLE'
	| 'TO_NEW_PATIENT_RESET'
	| 'TO_DASHBOARD'
	| 'TO_PATIENT_DASHBOARD';
