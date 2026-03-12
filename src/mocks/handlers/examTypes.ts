import { examTypesDTO } from '../fixtures/examTypesDTO';
import { badRequest, http } from '../utils';

export const examTypes = [
	http.get('/examtypes', async ({ response }) => {
		return response(200).json(examTypesDTO);
	}),
	http.post('/examtypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create exam type' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/examtypes/{code}', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update exam type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/examtypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete exam type' }),
			);
		}
		return response(200).json(true);
	}),
];
