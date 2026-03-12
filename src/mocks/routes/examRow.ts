import type { PollyServer } from '@pollyjs/core';
import { examRowsDTO } from '../fixtures/examRowsDTO';

export const examRowRoutes = (server: PollyServer) => {
	server.namespace('/examrows', () => {
		server.get('/byExamCode/:examCode').intercept((_req, res) => {
			res.status(200).json(examRowsDTO);
		});
	});
};
