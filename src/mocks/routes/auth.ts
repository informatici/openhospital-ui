import type { PollyServer } from '@pollyjs/core';
import { passwordPolicyDTO } from '../fixtures/passwordPolicyDTO';

const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY';

export const authRoutes = (server: PollyServer) => {
	server.namespace('/auth', () => {
		server.post('/login').intercept((req, res) => {
			const username = JSON.parse(req.body ?? '{}').username;

			switch (username) {
				case 'fail':
					res.status(401);
					break;
				// log in as "expired" or "reset" to exercise the forced password change (OP-896)
				case 'expired':
					res.status(200).json({
						username: 'John Doe',
						token: TOKEN,
						mustChangePassword: true,
						passwordExpired: true,
						passwordLeaseDays: 90,
					});
					break;
				case 'reset':
					res.status(200).json({
						username: 'John Doe',
						token: TOKEN,
						mustChangePassword: true,
						passwordExpired: false,
					});
					break;
				default:
					res.status(200).json({
						username: 'John Doe',
						token: TOKEN,
						mustChangePassword: false,
					});
					break;
			}
		});
		server.get('/password-policy').intercept((_req, res) => {
			res.status(200).json(passwordPolicyDTO);
		});
		server.post('/logout').intercept((_req, res) => {
			res.status(200);
		});
	});
};
