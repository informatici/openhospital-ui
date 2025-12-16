import { medicalTypesDTO } from '../fixtures/medicalTypesDTO';
import { badRequest, http } from '../utils';

export const medicalTypes = [
	http.get('/medicaltypes', async ({ response }) => {
		return response(200).json(medicalTypesDTO);
	}),
	http.post('/medicaltypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create medical type' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/medicaltypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update medical type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/medicaltypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete medical type' }),
			);
		}
		return response(200).json(true);
	}),
];
