import { BASE_PATH, Configuration } from '../../generated';
import { applyLanguageMiddleware } from './applyLanguageMiddleware';
import { applyTokenMiddleware } from './applyTokenMiddleware';

export const API_BASE_PATH = import.meta.env.VITE_BASE_PATH || BASE_PATH;

export const customConfiguration = (authenticated = true) => {
	return authenticated
		? new Configuration({
				basePath: API_BASE_PATH,
				middleware: [applyTokenMiddleware, applyLanguageMiddleware],
			})
		: new Configuration({ basePath: API_BASE_PATH });
};
