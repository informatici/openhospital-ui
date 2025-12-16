import { operationRowsDTO } from '../fixtures/operationRowsDTO';
import { operationsDTO } from '../fixtures/operationsDTO';
import { badRequest, http } from '../utils';

export const operations = [
	http.get('/operations', async ({ response }) => {
		return response(200).json(operationsDTO);
	}),
	http.get('/operations/rows/search/admission', async ({ response }) => {
		return response(200).json(operationRowsDTO);
	}),
	http.get('/operations/rows/search/patient', async ({ response }) => {
		return response(200).json(operationRowsDTO);
	}),
	http.post('/operations/rows', async ({ request, response }) => {
		const body = await request.json();
		if (body.remarks === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(body);
	}),
	http.put('/operations/rows', async ({ request, response }) => {
		const body = await request.json();
		if (body.remarks === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(200).json(body.id ?? 0);
	}),
	http.delete('/operations/rows/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(200).json(true);
	}),
	http.post('/operations', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create operation' }),
			);
		}
		return response(201).json(body);
	}),
	http.put('/operations/{code}', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update operation' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete('/operations/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update operation' }),
			);
		}
		return response(200).json(true);
	}),
];
