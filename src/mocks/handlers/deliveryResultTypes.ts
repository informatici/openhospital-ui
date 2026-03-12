import { deliveryResultTypeDTO } from '../fixtures/deliveryResultTypeDTO';
import { badRequest, http } from '../utils';

export const deliveryResultTypes = [
	http.get('/deliveryresulttypes', async ({ response }) => {
		return response(200).json(deliveryResultTypeDTO);
	}),
	http.post('/deliveryresulttypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create delivery result type' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/deliveryresulttypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update delivery result type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/deliveryresulttypes/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to delete delivery result type' }),
			);
		}
		return response(200).json(true);
	}),
];
