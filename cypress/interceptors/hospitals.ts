import { hospitalDTO } from '../../src/mocks/fixtures/hospitalDTO';
import { badRequest, http, jsonResponse, noContent } from '../utils';

export const hospitals = [
	http.get('/hospitals', () => jsonResponse(hospitalDTO)),
	http.get('/hospitals/{code}', (req) => {
		const url = new URL(req.url);
		const code = url.pathname.split('/').pop();
		if (code === '1') {
			return badRequest({ message: 'Request failed' });
		}
		if (code === '2') {
			return noContent();
		}
		return jsonResponse(hospitalDTO);
	}),
	http.put('/hospitals/{code}', (req) => {
		const body = req.body;
		if (body.description === 'FAIL') {
			return badRequest({ message: 'Invalid payload' });
		}
		return jsonResponse(body);
	}),
];
