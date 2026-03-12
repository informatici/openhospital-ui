import type { PollyServer } from '@pollyjs/core';
import { permissionDTO } from '../fixtures/permissionDTO';

export const permissionRoutes = (server: PollyServer) => {
	server.namespace('/permissions', () => {
		server.get('/').intercept((_req, res) => {
			res.status(200).json(permissionDTO);
		});
		server.put(':id').intercept((_req, res) => {
			res.status(200).json(permissionDTO[0]);
		});
	});
};
