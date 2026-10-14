import type { PollyServer } from '@pollyjs/core';
import { permissionList } from '../fixtures/permissionList';
import { usersDTO } from '../fixtures/usersDTO';

export const userRoutes = (server: PollyServer) => {
	server.namespace('/users', () => {
		server.get('/me').intercept((_req, res) => {
			res.status(200).json({
				userName: 'admin',
				permissions: permissionList,
				userGroupName: 'ADMIN',
				userDesc: 'John Doe',
			});
		});
		server.get('/settings').intercept((_req, res) => {
			res
				.status(200)
				.json([{ id: 1, configName: 'landing', configValue: '/' }]);
		});
		server.get('/').intercept((_req, res) => {
			res.status(200).json(usersDTO);
		});
		server.get('/:username').intercept((_req, res) => {
			res.status(200).json(usersDTO[0]);
		});
		server.post('/').intercept((_req, res) => {
			res.status(200).json(usersDTO[0]);
		});
		server.put('/:username').intercept((_req, res) => {
			res.status(200).json(_req.jsonBody());
		});
		server.delete('/:username').intercept((req, res) => {
			const username = req.params.username;
			switch (username) {
				case 'FAIL':
					res.status(400).json({ message: 'Fail to delete user' });
					break;
				default:
					res.status(204);
			}
		});
	});
};
