import { dischargeTypesDTO } from '../fixtures/dischargeTypesDTO';
import { badRequest, http } from '../utils';

export const dischargeTypes = [
	http.get('/dischargetypes', async ({ response }) => {
		return response(200).json(dischargeTypesDTO);
	}),
	http.post('/dischargetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create discharge type' }),
			);
		}
		return response(200).json(body);
	}),
	http.put('/dischargetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update discharge type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/dischargetypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete discharge type' }),
			);
		}
		return response(200).json(true);
	}),
];
