import { priceDTO } from '../fixtures/priceDTO';
import { priceListDTO } from '../fixtures/priceListDTO';
import { badRequest, http } from '../utils';

export const prices = [
	http.get('/pricelists/prices', async ({ response }) => {
		return response(200).json(priceDTO);
	}),
	http.get('/pricelists', async ({ response }) => {
		return response(200).json(priceListDTO);
	}),
	http.post('/pricelists', async ({ request, response }) => {
		const body = await request.json();
		return body.code === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to create price list' }))
			: response(201).json(body);
	}),
	http.put('/pricelists/{id}', async ({ request, response }) => {
		const body = await request.json();
		return body.code === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to update price list' }))
			: response(200).json(body);
	}),
	http.delete('/pricelists/{id}', async ({ params, response }) => {
		return params.id === '-1'
			? response.untyped(badRequest({ message: 'Fail to delete price list' }))
			: response(200).json(true);
	}),
];
