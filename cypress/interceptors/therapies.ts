import { format } from 'date-fns';
import therapyDTO from '../../src/mocks/fixtures/therapyDTO';
import {
	badRequest,
	http,
	jsonResponse,
	lastPathSegment,
	noContent,
} from '../utils';

export const therapies = [
	http.post('/therapies', (req) => {
		const body = req.body;
		body.startDate = format(new Date(+body.startDate), 'yyyy-MM-dd HH:mm:ss');
		body.endDate = format(new Date(+body.endDate), 'yyyy-MM-dd HH:mm:ss');
		if (body.therapyID === '25') {
			return badRequest(null);
		}
		return jsonResponse(body, 201);
	}),
	http.post('/therapies/replace', (req) => {
		const body = req.body;
		if (body.therapyID === '42') {
			return badRequest(null);
		}
		return jsonResponse(body, 201);
	}),
	http.get('/therapies/{code_patient}', (req) => {
		const code = lastPathSegment(req.url);
		switch (code) {
			case '10000':
				return badRequest(null);
			case '21266':
				return noContent();
			default:
				return jsonResponse([therapyDTO, therapyDTO, therapyDTO, therapyDTO]);
		}
	}),
];
