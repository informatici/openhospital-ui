import { pregnantTreatmentTypeDTO } from '../../src/mocks/fixtures/pregnantTreatmentDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const pregnantTreatmentType = [
	http.get('/pregnanttreatmenttypes', () =>
		jsonResponse(pregnantTreatmentTypeDTO),
	),
	http.post('/pregnanttreatmenttypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create pregnant treatment type' });
		}
		return jsonResponse(body);
	}),
	http.put('/pregnanttreatmenttypes/{code}', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update pregnant treatment  type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/pregnanttreatmenttypes/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete pregnant treatment  type' });
		}
		return jsonResponse(true);
	}),
];
