import type { PollyServer } from '@pollyjs/core';

export const authRoutes = (server: PollyServer) => {
	server.namespace('/auth', () => {
		server.post('/login').intercept((req, res) => {
			const username = JSON.parse(req.body ?? '{}').username;

			switch (username) {
				case 'fail':
					res.status(401);
					break;
				default:
					res.status(200).json({
						username: 'John Doe',
						token:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY',
					});
					break;
			}
		});
		server.post('/logout').intercept((_req, res) => {
			res.status(200);
		});
	});
};
