import { deliveryTypesDTO } from '../../src/mocks/fixtures/deliveryTypesDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const deliveryTypes = [
	http.get('/deliverytypes', () => jsonResponse(deliveryTypesDTO)),
	http.post('/deliverytypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create delivery type' });
		}
		return jsonResponse(body);
	}),
	http.put('/deliverytypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update delivery type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/deliverytypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete delivery type' });
		}
		return jsonResponse(true);
	}),
];
