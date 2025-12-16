import { hospitalDTO } from '../fixtures/hospitalDTO';
import { badRequest, http } from '../utils';

export const hospital = [
	http.get('/hospitals', async ({ response }) => {
		return response(200).json(hospitalDTO);
	}),
	http.get('/hospitals/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '1') {
			return response.untyped(badRequest({}));
		}
		if (code === '2') {
			return response(204);
		}
		return response(200).json(hospitalDTO);
	}),
	http.put('/hospitals/{code}', async ({ request, response }) => {
		const body = await request.json();
		if (body.description === 'FAIL') {
			return response.untyped(badRequest({ message: 'Invalid payload' }));
		}
		return response(200).json(body);
	}),
];
