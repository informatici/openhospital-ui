import { operationRowsDTO } from '../../src/mocks/fixtures/operationRowsDTO';
import { operationsDTO } from '../../src/mocks/fixtures/operationsDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const operations = [
	http.get('/operations', () => jsonResponse(operationsDTO)),
	http.get('/operations/rows/search/admission', () =>
		jsonResponse(operationRowsDTO),
	),
	http.get('/operations/rows/search/patient', () =>
		jsonResponse(operationRowsDTO),
	),
	http.get('/operations/rows/search/opd', () => jsonResponse(operationRowsDTO)),
	http.post('/operations/rows', (req) => {
		const body = req.body;
		if (body.remarks === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body, 201);
	}),
	http.put('/operations/rows', (req) => {
		const body = req.body;
		if (body.remarks === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body);
	}),
	http.delete('/operations/rows/{code}', () => badRequest(null)),
	http.post('/operations', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to create operation' });
		}
		return jsonResponse(body);
	}),
	http.put('/operations/{code}', (req) => {
		const body = req.body;
		if (body.code === 'FAIL') {
			return badRequest({ message: 'Fail to update operation' });
		}
		return jsonResponse(body);
	}),
	http.delete('/operations/{code}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to update operation' });
		}
		return jsonResponse(null);
	}),
];
