import { admissionTypesDTO } from '../../src/mocks/fixtures/admissionsTypesDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const admissionTypes = [
	http.get('/admissiontypes', () => jsonResponse(admissionTypesDTO)),
	http.post('/admissiontypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create admission type' });
		}
		return jsonResponse(body);
	}),
	http.put('/admissiontypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update admission type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/admissiontypes/{code}', (req) => {
		const code = new URL(req.url).pathname.split('/').pop();
		if (code === 'FAIL') {
			return badRequest({ message: 'Fail to delete admission type' });
		}
		return jsonResponse(true);
	}),
];
