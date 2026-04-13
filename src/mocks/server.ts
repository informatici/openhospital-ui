import XHRAdapter from '@pollyjs/adapter-xhr';
import { Polly } from '@pollyjs/core';
import { API_BASE_PATH } from '~/libraries/apiUtils/configuration';
import * as routes from './routes';

export function makeServer() {
	Polly.register(XHRAdapter);
	const polly = new Polly('api-mocking', {
		adapters: ['xhr'],
		mode: 'passthrough',
		logLevel: 'WARN',
	});
	const { server } = polly;
	server.host(API_BASE_PATH, () => {
		Object.values(routes).forEach((route) => {
			route(server);
		});
	});
	return server;
}
