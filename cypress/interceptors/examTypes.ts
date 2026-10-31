import { examTypesDTO } from '../../src/mocks/fixtures/examTypesDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const examTypes = [
	http.get('/examtypes', () => jsonResponse(examTypesDTO)),
	http.post('/examtypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create exam type' });
		}
		return jsonResponse(body);
	}),
	http.put('/examtypes/{code}', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update exam type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/examtypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete exam type' });
		}
		return jsonResponse(true);
	}),
];
