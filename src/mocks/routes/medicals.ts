import type { PollyServer } from '@pollyjs/core';
import { medicalDTO } from '../fixtures/medicalDTO';

export const medicalRoutes = (server: PollyServer) => {
	server.namespace('/medicals', () => {
		server.get('/').intercept((req, res) => {
			const code = req.params.code;
			switch (code) {
				case '1':
					res.status(400);
					break;
				case '2':
					res.status(204);

					break;
				default:
					res.status(200).json([medicalDTO]);
			}
		});
	});
};
