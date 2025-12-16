import { examRowsDTO } from '../fixtures/examRowsDTO';
import { http } from '../utils';

export const examRow = [
	http.get('/examrows/byExamCode/{examCode}', async ({ response }) => {
		return response(200).json(examRowsDTO);
	}),
];
