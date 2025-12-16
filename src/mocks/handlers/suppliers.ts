import { supplierDTO } from '../fixtures/supplierDTO';
import { badRequest, http } from '../utils';

export const suppliers = [
	http.get('/suppliers', async ({ response }) => {
		return response(200).json(supplierDTO);
	}),
	http.post('/suppliers', async ({ request, response }) => {
		const body = await request.json();
		if (body.supId === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create supplier' }),
			);
		}
		body.supId = 100;
		return response(200).json(body);
	}),
	http.put('/suppliers', async ({ request, response }) => {
		const body = await request.json();
		if (body.supId === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update supplier' }),
			);
		}
		return response(200).json(body);
	}),
];
