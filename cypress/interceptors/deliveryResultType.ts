import { deliveryResultTypeDTO } from '../../src/mocks/fixtures/deliveryResultTypeDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const deliveryResultType = [
	http.get('/deliveryresulttypes', () => jsonResponse(deliveryResultTypeDTO)),
	http.post('/deliveryresulttypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create delivery result type' });
		}
		return jsonResponse(body);
	}),
	http.put('/deliveryresulttypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update delivery result type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/deliveryresulttypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete delivery result type' });
		}
		return jsonResponse(true);
	}),
];
