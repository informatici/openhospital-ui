import vaccineTypesDTO from '../../src/mocks/fixtures/vaccineTypesDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const vaccineTypes = [
	http.get('/vaccinetypes', () => jsonResponse(vaccineTypesDTO)),
	http.post('/vaccinetypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create vaccine type' });
		}
		return jsonResponse(body);
	}),
	http.put('/vaccinetypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update vaccine type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/vaccinetypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete vaccine type' });
		}
		return jsonResponse(true);
	}),
];
