import { supplierDTO } from '../../src/mocks/fixtures/supplierDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const suppliers = [
	http.get('/suppliers', () => jsonResponse(supplierDTO)),
	http.post('/suppliers', (req) => {
		const body = req.body;
		if (body.supId === 'FAIL') {
			return badRequest({ message: 'Fail to create supplier' });
		}
		return jsonResponse({ ...body, supId: 100 });
	}),
	http.put('/suppliers', (req) => {
		const body = req.body;
		if (body.supId === 'FAIL') {
			return badRequest({ message: 'Fail to update supplier' });
		}
		return jsonResponse(body);
	}),
];
