import { diseaseTypesDTO } from '../../src/mocks/fixtures/diseaseTypesDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const diseaseTypes = [
	http.get('/diseasetypes', () => jsonResponse(diseaseTypesDTO)),
	http.post('/diseasetypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create disease type' });
		}
		return jsonResponse(body, 201);
	}),
	http.put('/diseasetypes', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update disease type' });
		}
		return jsonResponse(body);
	}),
	http.delete('/diseasetypes/{code}', (req) => {
		const url = new URL(req.url);
		const code = url.pathname.split('/').pop();
		if (code === 'FAIL') {
			return badRequest({ message: 'Fail to delete disease type' });
		}
		return jsonResponse(true);
	}),
];
