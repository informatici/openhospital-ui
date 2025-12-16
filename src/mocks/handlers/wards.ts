import { wards } from '../fixtures/wardDTO';
import { badRequest, http } from '../utils';

export const wardsHandlers = [
	http.get('/wards', async ({ request, response }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get('code');
		switch (code) {
			case '1':
				return response.untyped(badRequest({ message: 'Fail to get wards' }));
			case '2':
				return response(204);
			default:
				return response(200).json(wards);
		}
	}),
	http.post('/wards', async ({ request, response }) => {
		const body = await request.json();
		return body.code === 'FL'
			? response.untyped(badRequest({ message: 'Fail to create ward' }))
			: response(200).json(body);
	}),
	http.put('/wards', async ({ request, response }) => {
		const body = await request.json();
		return body.code === 'FL'
			? response.untyped(badRequest({ message: 'Fail to update ward' }))
			: response(200).json(body);
	}),
	http.delete('/wards/:code', async ({ params, response }) => {
		const code = params.code;
		return code === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to delete ward' }))
			: response(204);
	}),
];
