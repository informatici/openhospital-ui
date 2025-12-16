import { examsDTO } from '../fixtures/examsDTO';
import { badRequest, http } from '../utils';

export const exams = [
	http.get('/exams', ({ response }) => {
		return response(200).json(examsDTO);
	}),
	http.post('/exams', async ({ request, response }) => {
		const body = await request.json();
		return body.exam.code === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to create exam' }))
			: response(201).json(body.exam);
	}),
	http.put('/exams/{code}', async ({ request, response }) => {
		const body = await request.json();
		return body.exam.description === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to update exam' }))
			: response(200).json(body.exam);
	}),
	http.delete('/exams/{code}', async ({ params, response }) => {
		return params.code === '01.04'
			? response.untyped(badRequest({ message: 'Fail to delete exam' }))
			: response(200).json(true);
	}),
];
