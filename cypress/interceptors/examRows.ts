import { examRowsDTO } from '../../src/mocks/fixtures/examRowsDTO';
import { http, jsonResponse } from '../utils';

export const examRows = [
	http.get('/examrows/byExamCode/{examCode}', () => jsonResponse(examRowsDTO)),
];
