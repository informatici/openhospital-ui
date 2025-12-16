import { diseaseTypesDTO } from '../fixtures/diseaseTypesDTO';
import { badRequest, http } from '../utils';

export const diseaseTypes = [
	http.get('/diseasetypes', async ({ response }) => {
		return response(200).json(diseaseTypesDTO);
	}),
	http.post('/diseasetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create disease type' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/diseasetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update disease type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/diseasetypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete disease type' }),
			);
		}
		return response(200).json(true);
	}),
];
