import { examRequestDTO } from '../fixtures/examRequestDTO';
import { badRequest, http } from '../utils';

export const labExamRequest = [
	http.get('/laboratories/examRequest/patient/{id}', async ({ response }) => {
		return response(200).json(examRequestDTO);
	}),
	http.post('/laboratories/examRequest', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create lab exam request' }),
			);
		}
		return response(200).json(body);
	}),
];
