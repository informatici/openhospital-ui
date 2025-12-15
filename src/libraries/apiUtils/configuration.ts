import { BASE_PATH, Configuration } from '../../generated';
import { applyLanguageMiddleware } from './applyLanguageMiddleware';
import { applyTokenMiddleware } from './applyTokenMiddleware';

const basePath = import.meta.env.VITE_APP_BASE_PATH || BASE_PATH;

export const customConfiguration = (authenticated = true) => {
	return authenticated
		? new Configuration({
				basePath,
				middleware: [applyTokenMiddleware, applyLanguageMiddleware],
			})
		: new Configuration({ basePath });
};
