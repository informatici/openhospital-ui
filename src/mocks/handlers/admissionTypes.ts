import { admissionTypesDTO } from '../fixtures/admissionsTypesDTO';
import { badRequest, http } from '../utils';

export const admissionTypes = [
	http.get('/admissiontypes', async ({ response }) => {
		return response(200).json(admissionTypesDTO);
	}),
	http.post('/admissiontypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create admission type' }),
			);
		}
		return response(200).json(body);
	}),
	http.put('/admissiontypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update admission type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/admissiontypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete admission type' }),
			);
		}
		return response(200).json(true);
	}),
];
