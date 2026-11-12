import { medicalTypesDTO } from '../../src/mocks/fixtures/medicalTypesDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const medicalTypes = [
	http.get('/medicaltypes', () => jsonResponse(medicalTypesDTO)),
	http.post('/medicaltypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create medical type' });
		}
		return jsonResponse(body);
	}),
	http.put('/medicaltypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update medical type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/medicaltypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete medical type' });
		}
		return jsonResponse(true);
	}),
];
