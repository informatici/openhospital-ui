import { ageTypes } from './ageTypes';
import { auth } from './auth';
import { diseases } from './diseases';
import { diseaseTypes } from './diseaseTypes';

export * from './ageTypes';
export * from './auth';
export * from './diseases';
export * from './diseaseTypes';
export * from './hospitals';

export const interceptors = [
	...ageTypes,
	...auth,
	...diseases,
	...diseaseTypes,
];
