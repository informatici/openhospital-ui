import { examRequestDTO } from '../../src/mocks/fixtures/examRequestDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const labExamRequest = [
	http.get('/laboratories/examRequest/patient/{id}', () =>
		jsonResponse(examRequestDTO),
	),
	http.post('/laboratories/examRequest', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create lab exam request' });
		}
		return jsonResponse(body);
	}),
];
