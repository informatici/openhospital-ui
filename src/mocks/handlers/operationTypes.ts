import { operationTypesDTO } from '../fixtures/operationTypeDTO';
import { badRequest, http } from '../utils';

export const operationTypes = [
	http.get('/operationtypes', async ({ response }) => {
		return response(200).json(operationTypesDTO);
	}),
	http.post('/operationtypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create operation type' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/operationtypes/{code}', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update operation type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/operationtypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete operation type' }),
			);
		}
		return response(200).json(true);
	}),
];
