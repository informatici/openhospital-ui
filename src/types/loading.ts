export const LOADING = 'LOADING';

export interface LoadingAction{
    type: typeof LOADING
    status: boolean
} 