import { format } from 'date-fns';
import { therapyRowDTO } from '../fixtures/therapyRowDTO';
import { badRequest, http, noContent } from '../utils';

export const therapies = [
	http.post('/therapies', async ({ request, response }) => {
		const body = await request.json();
		body.startDate = format(new Date(+body.startDate), 'yyyy-MM-dd HH:mm:ss');
		body.endDate = format(new Date(+body.endDate), 'yyyy-MM-dd HH:mm:ss');
		if (body.therapyID?.toString() === '25') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(body);
	}),
	http.post('/therapies/replace', async ({ request, response }) => {
		const body = (await request.json())?.[0];
		if (!body) {
			return response.untyped(badRequest({ message: 'Invalid request body' }));
		}
		if (body.toString() === '42') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(body);
	}),
	http.get('/therapies/{code_patient}', async ({ params, response }) => {
		const code = params.code_patient;
		if (code === '10000') {
			return response.untyped(badRequest({}));
		}
		if (code === '21266') {
			return response.untyped(noContent());
		}
		return response(200).json([
			therapyRowDTO,
			therapyRowDTO,
			therapyRowDTO,
			therapyRowDTO,
		]);
	}),
];
