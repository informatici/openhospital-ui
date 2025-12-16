import { vaccineDTO } from '../fixtures/vaccineDTO';
import { badRequest, http } from '../utils';

export const vaccines = [
	http.get('/vaccines', async ({ response }) => {
		return response(200).json(vaccineDTO);
	}),
	http.post('/vaccines', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create vaccine' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/vaccines', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update vaccine' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/vaccines/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete vaccine' }),
			);
		}
		return response(200).json(true);
	}),
];
