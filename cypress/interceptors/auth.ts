import { http, jsonResponse, unauthorized } from '../utils';

const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY';

export const auth = [
	http.post('/auth/login', (req) => {
		const username = req.body.username;

		switch (username) {
			case 'fail':
				return unauthorized({ message: 'Invalid credentials' });
			// log in as "expired" or "reset" to exercise the forced password change (OP-896)
			case 'expired':
				return jsonResponse({
					username: 'John Doe',
					token: TOKEN,
					mustChangePassword: true,
					passwordExpired: true,
					passwordLeaseDays: 90,
				});
			case 'reset':
				return jsonResponse({
					username: 'John Doe',
					token: TOKEN,
					mustChangePassword: true,
					passwordExpired: false,
				});
			default:
				return jsonResponse({
					username: 'John Doe',
					token: TOKEN,
					mustChangePassword: false,
				});
		}
	}),
	http.post('/auth/logout', () => jsonResponse(null)),
];
