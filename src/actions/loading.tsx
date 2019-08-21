export const LOADING = 'LOADING'

export function loading(status){
	return {
		type: LOADING,
		status,
	}
} 