import { operationTypesDTO } from '../../src/mocks/fixtures/operationTypeDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const operationTypes = [
	http.get('/operationtypes', () => jsonResponse(operationTypesDTO)),
	http.post('/operationtypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create operation type' });
		}
		return jsonResponse(body);
	}),
	http.put('/operationtypes/{code}', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update operation type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/operationtypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete operation type' });
		}
		return jsonResponse(true);
	}),
];
