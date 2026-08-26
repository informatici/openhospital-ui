import vaccineTypesDTO from '../fixtures/vaccineTypesDTO';
import { badRequest, http } from '../utils';

export const vaccineTypes = [
	http.get('/vaccinetypes', async ({ response }) => {
		return response(200).json(vaccineTypesDTO);
	}),
	http.post('/vaccinetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create vaccine type' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/vaccinetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update vaccine type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/vaccinetypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete vaccine type' }),
			);
		}
		return response(200).json(true);
	}),
];
