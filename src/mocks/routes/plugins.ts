import type { PollyServer } from '@pollyjs/core';
import { plugins as PLUGINS } from '../fixtures/plugins';

export const pluginsRoutes = (server: PollyServer) => {
	server.namespace('/plugins', () => {
		server.get('/').intercept((_req, res) => {
			res.status(200).json(
				PLUGINS.flatMap((plugin) => [
					plugin,
					{
						...plugin,
						configuration: {
							...plugin.configuration,
							bundle: {
								...(plugin.configuration?.bundle || {}),
								location: 'patient',
							},
						},
					},
				]),
			);
		});
	});
};
