import visitDTO from '../../src/mocks/fixtures/visitDTO';
import { badRequest, http, jsonResponse, noContent } from '../utils';

export const visits = [
	http.post('/visit', (req) => {
		const body = req.body;
		if (body.duration === 100) {
			return badRequest(null);
		}
		if (body.duration === 30) {
			return noContent();
		}
		return jsonResponse(body, 201);
	}),
	http.put('/visit/{visitID}', (req) => {
		const body = req.body;
		if (body.duration === 100) {
			return badRequest(null);
		}
		if (body.duration === 30) {
			return { statusCode: 404, body: null };
		}
		return jsonResponse(body);
	}),
	http.get('/visit/patient/{patID}', () =>
		jsonResponse([visitDTO, visitDTO, visitDTO]),
	),
	http.post('/visits', (req) => jsonResponse(req.body, 201)),
];
