import { examsDTO } from '../../src/mocks/fixtures/examsDTO';
import { badRequest, http, jsonResponse, lastPathSegment } from '../utils';

export const exams = [
	http.get('/exams', () => jsonResponse(examsDTO)),
	http.post('/exams', (req) => {
		const body = req.body;
		if (body.exam.code === 'FAIL') {
			return badRequest({ message: 'Fail to create exam' });
		}
		return jsonResponse(body.exam, 201);
	}),
	http.put('/exams/{code}', (req) => {
		const body = req.body;
		if (body.exam.description === 'FAIL') {
			return badRequest({ message: 'Fail to update exam' });
		}
		return jsonResponse(body.exam);
	}),
	http.delete('/exams/{code}', (req) => {
		if (lastPathSegment(req.url) === '01.04') {
			return badRequest(null);
		}
		return jsonResponse(null);
	}),
];
