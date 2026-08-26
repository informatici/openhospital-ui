import visitDTO from '../fixtures/visitDTO';
import { badRequest, http, noContent, notFound } from '../utils';

export const visits = [
	http.post('/visits', async ({ request, response }) => {
		const body = await request.json();
		switch (body.duration) {
			case 100:
				return response.untyped(
					badRequest({ message: 'Fail to create visit' }),
				);
			case 30:
				return response.untyped(noContent());
			default:
				return response(201).json(body);
		}
	}),
	http.put('/visits/{visitID}', async ({ request, response }) => {
		const body = await request.json();
		switch (body.duration) {
			case 100:
				return response.untyped(
					badRequest({ message: 'Fail to update visit' }),
				);
			case 30:
				return response.untyped(notFound({ message: 'Visit not found' }));
			default:
				return response(200).json(body);
		}
	}),
	http.get('/visits/patient/{patID}', async ({ params, response }) => {
		const code = params.patID; // assuming patID is used as code
		switch (code) {
			case '1':
				return response.untyped(badRequest({ message: 'Fail to get visits' }));
			case '2':
				return response.untyped(noContent());
			default:
				return response(200).json([visitDTO, visitDTO, visitDTO]);
		}
	}),
	http.post('/visits', async ({ request, response }) => {
		const body = await request.json();
		switch (body.visitID?.toString()) {
			case '0':
				return response.untyped(
					badRequest({ message: 'Fail to create visits' }),
				);
			case '2':
				return response.untyped(noContent());
			default:
				return response(201).json(body);
		}
	}),
];
