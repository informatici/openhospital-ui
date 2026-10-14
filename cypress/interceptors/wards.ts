import { wards as wardDTOs } from '../../src/mocks/fixtures/wardDTO';
import {
	badRequest,
	http,
	jsonResponse,
	lastPathSegment,
	noContent,
} from '../utils';

export const wards = [
	http.get('/wards', () => jsonResponse(wardDTOs)),
	http.post('/wards', (req) => {
		const body = req.body;
		if (body.code === 'FL') {
			return badRequest({ message: 'Fail to create ward' });
		}
		return jsonResponse(body);
	}),
	http.put('/wards', (req) => {
		const body = req.body;
		if (body.code === 'FL') {
			return badRequest({ message: 'Fail to update ward' });
		}
		return jsonResponse(body);
	}),
	http.delete('/wards/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete ward' });
		}
		return noContent();
	}),
];
