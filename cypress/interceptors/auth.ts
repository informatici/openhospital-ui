import { http, jsonResponse, unauthorized } from '../utils';

export const auth = [
	http.post('/auth/login', (req) => {
		const body = req.body;
		const username = body.username;

		return username === 'fail'
			? unauthorized({ message: 'Invalid credentials' })
			: jsonResponse({
					username: 'John Doe',
					token:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY',
				});
	}),
	http.post('/auth/logout', () => jsonResponse(null)),
];
