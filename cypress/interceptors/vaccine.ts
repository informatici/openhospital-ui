import { vaccineDTO } from '../../src/mocks/fixtures/vaccineDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const vaccine = [
	http.get('/vaccines', () => jsonResponse(vaccineDTO)),
	http.post('/vaccines', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create vaccine' });
		}
		return jsonResponse(body);
	}),
	http.put('/vaccines', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update vaccine' });
		}
		return jsonResponse(body);
	}),
	http.delete('/vaccines/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete vaccine' });
		}
		return jsonResponse(true);
	}),
];
