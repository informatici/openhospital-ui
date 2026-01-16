import type { PollyServer } from '@pollyjs/core';
import { supplierDTO } from '../fixtures/supplierDTO';

export const suppliersRoutes = (server: PollyServer) => {
	server.namespace('/suppliers', () => {
		server.get('/').intercept((_req, res) => {
			res.status(200).json(supplierDTO);
		});
		server.post('/').intercept((req, res) => {
			const body = req.jsonBody();
			switch (body.supId) {
				case 'FAIL':
					res.status(400).json({ message: 'Fail to create supplier' });
					break;
				default:
					body.supId = 100;
					res.status(200).json(body);
			}
		});
		server.put('/').intercept((req, res) => {
			const body = req.jsonBody();
			switch (body.supId) {
				case 'FAIL':
					res.status(400).json({ message: 'Fail to update supplier' });
					break;
				default:
					res.status(200).json(body);
			}
		});
	});
};
