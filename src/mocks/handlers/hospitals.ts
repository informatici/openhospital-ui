import { HttpResponse } from 'msw';
import { hospitalDTO } from '../fixtures/hospitalDTO';
import { badRequest, http, noContent } from '../utils';

export const hospitals = [
	http.get('/hospitals', async ({ response }) => {
		return response(200).json(hospitalDTO);
	}),
	http.get('/hospitals/{code}' as any, async ({ params, response }) => {
		const code = params.code;
		if (code === '1') {
			return response.untyped(badRequest({}));
		}
		if (code === '2') {
			return response.untyped(noContent());
		}
		return response.untyped(HttpResponse.json(hospitalDTO));
	}),
	http.put('/hospitals/{code}', async ({ request, response }) => {
		const body = await request.json();
		if (body.description === 'FAIL') {
			return response.untyped(badRequest({ message: 'Invalid payload' }));
		}
		return response(200).json(body);
	}),
];
