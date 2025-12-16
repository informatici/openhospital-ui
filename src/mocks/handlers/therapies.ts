import { format } from 'date-fns';
import therapyDTO from '../fixtures/therapyDTO';
import { badRequest, http } from '../utils';

export const therapies = [
	http.post('/therapies', async ({ request, response }) => {
		const body = await request.json();
		body.startDate = format(new Date(+body.startDate), 'yyyy-MM-dd HH:mm:ss');
		body.endDate = format(new Date(+body.endDate), 'yyyy-MM-dd HH:mm:ss');
		if (body.therapyID === '25') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(body);
	}),
	http.post('/therapies/replace', async ({ request, response }) => {
		const body = await request.json();
		if (body.therapyID === '42') {
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
			return response(204);
		}
		return response(200).json([therapyDTO, therapyDTO, therapyDTO, therapyDTO]);
	}),
];
