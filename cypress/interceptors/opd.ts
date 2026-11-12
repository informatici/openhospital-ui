import { opdDTO } from '../../src/mocks/fixtures/opdDTO';
import { operationRowsDTO } from '../../src/mocks/fixtures/operationRowsDTO';
import {
	badRequest,
	http,
	jsonResponse,
	lastPathSegment,
	noContent,
	queryParam,
} from '../utils';

function withGeneratedRows(operationRows: any[] | undefined) {
	return (
		operationRows?.map((item) => ({
			...item,
			id: Math.floor(Math.random() * 100 + 1),
			opd: opdDTO,
		})) ?? []
	);
}

export const opd = [
	http.post('/opds', (req) => {
		const body = req.body;
		if (body.note === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body, 201);
	}),
	http.post('/opds/rows', (req) => {
		const body = req.body;
		if (body.note === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(
			{ opdDTO, operationRows: withGeneratedRows(body.operationRows) },
			201,
		);
	}),
	http.put('/opds/{code}', (req) => {
		if (lastPathSegment(req.url) === '100') {
			return badRequest(null);
		}
		return jsonResponse(req.body);
	}),
	http.put('/opds/rows/{code}', (req) => {
		if (lastPathSegment(req.url) === '100') {
			return badRequest(null);
		}
		const body = req.body;
		return jsonResponse(
			{ opdDTO, operationRows: withGeneratedRows(body.operationRows) },
			201,
		);
	}),
	http.get('/opds/patient/{pcode}', () =>
		jsonResponse([
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
		]),
	),
	http.get('/opds/last/{pcode}', () =>
		jsonResponse([
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
		]),
	),
	http.get('/opds/search', (req) => {
		const code = queryParam(req.url, 'patientCode');
		switch (code) {
			case '1000':
				return badRequest(null);
			case '200000':
				return noContent();
			default:
				if (+(code ?? 0) >= 0) {
					return jsonResponse({ data: [opdDTO, opdDTO, opdDTO], pageInfo: {} });
				}
				return jsonResponse({
					data: [
						opdDTO,
						{ ...opdDTO, sex: 'F', ageType: 'd1' },
						{ ...opdDTO, sex: 'F', ageType: 'd1' },
						{ ...opdDTO, sex: 'F', ageType: 'd4' },
						{ ...opdDTO, sex: 'M', ageType: 'd4' },
						{ ...opdDTO, sex: 'F', ageType: 'd2' },
						{ ...opdDTO, sex: 'M', ageType: 'd3' },
						{ ...opdDTO, sex: 'M', ageType: 'd2' },
						{ ...opdDTO, sex: 'M', ageType: 'd2' },
						{ ...opdDTO, sex: 'M', ageType: 'd2' },
						{ ...opdDTO, sex: 'F', ageType: 'd5' },
						{ ...opdDTO, sex: 'M', ageType: 'd5' },
					],
					pageInfo: {},
				});
		}
	}),
	http.delete('/opds/{code}', (req) => {
		if (lastPathSegment(req.url) === 'fail') {
			return badRequest(null);
		}
		return { statusCode: 201, body: null };
	}),
];
