import { passwordPolicyDTO } from '../fixtures/passwordPolicyDTO';
import { http, unauthorized } from '../utils';

export const auth = [
	http.post('/auth/login', async ({ request, response }) => {
		const body = await request.json();
		const username = body.username;

		if (username === 'fail') {
			return response.untyped(unauthorized({ message: 'Invalid credentials' }));
		}

		// log in as "expired" to exercise the forced password change (OP-896)
		if (username === 'expired') {
			return response(200).json({
				username: 'John Doe',
				token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY',
				mustChangePassword: true,
				passwordExpired: true,
				passwordLeaseDays: 90,
			});
		}

		return response(200).json({
			username: 'John Doe',
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY',
			mustChangePassword: false,
		});
	}),
	http.get('/auth/password-policy', ({ response }) => {
		return response(200).json(passwordPolicyDTO);
	}),
	http.post('/auth/logout', ({ response }) => {
		return response(200).empty();
	}),
];
