import { dischargeTypesDTO } from '../../src/mocks/fixtures/dischargeTypesDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const dischargeTypes = [
	http.get('/dischargetypes', () => jsonResponse(dischargeTypesDTO)),
	http.post('/dischargetypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create discharge type' });
		}
		return jsonResponse(body);
	}),
	http.put('/dischargetypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update discharge type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/dischargetypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete discharge type' });
		}
		return jsonResponse(true);
	}),
];
