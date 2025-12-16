import { deliveryTypesDTO } from '../fixtures/deliveryTypesDTO';
import { badRequest, http } from '../utils';

export const deliveryTypes = [
	http.get('/deliverytypes', async ({ response }) => {
		return response(200).json(deliveryTypesDTO);
	}),
	http.post('/deliverytypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create delivery type' }),
			);
		}
		return response(200).json(body);
	}),
	http.put('/deliverytypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update delivery type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/deliverytypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete delivery type' }),
			);
		}
		return response(200).json(true);
	}),
];
