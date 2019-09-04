import { LOADING, LoadingAction } from '../types/loading';

export function loading(status: boolean): LoadingAction{
	return {
		type: LOADING,
		status,
	}
} 