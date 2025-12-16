import { opdDTO } from '../fixtures/opdDTO';
import { operationRowsDTO } from '../fixtures/operationRowsDTO';
import { badRequest, http, noContent } from '../utils';

export const opds = [
	http.post('/opds', async ({ request, response }) => {
		const body = await request.json();
		if (body.note === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(body);
	}),
	http.post('/opds/rows', async ({ request, response }) => {
		const body = await request.json();
		if (body.opdDTO?.note === 'fail') {
			return response.untyped(badRequest({}));
		}
		const operationRows =
			body.operationRows?.map((item) => {
				return {
					...item,
					id: Math.floor(Math.random() * 100 + 1),
					opd: opdDTO,
				};
			}) ?? [];
		return response(201).json({
			opdDTO,
			operationRows,
		});
	}),
	http.put('/opds/{code}', async ({ params, request, response }) => {
		const code = params.code;
		if (code === '100') {
			return response.untyped(badRequest({}));
		}
		const body = await request.json();
		return response(200).json(body);
	}),
	http.put('/opds/rows/{code}', async ({ params, request, response }) => {
		const code = params.code;
		if (code === '100') {
			return response.untyped(badRequest({}));
		}
		const body = await request.json();
		const operationRows =
			body.operationRows?.map((item) => {
				return {
					...item,
					id: Math.floor(Math.random() * 100 + 1),
					opd: opdDTO,
				};
			}) ?? [];
		return response(200).json({
			opdDTO,
			operationRows,
		});
	}),
	http.get('/opds/patient/{pcode}', async ({ params, response }) => {
		const pcode = params.pcode;
		if (pcode === '1000') {
			return response.untyped(badRequest({}));
		}
		if (pcode === '200000') {
			return response.untyped(noContent());
		}
		return response(200).json([
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
			{ opdDTO, operationRows: operationRowsDTO },
		]);
	}),
	http.get('/opds/last/{patientCode}', async ({ params, response }) => {
		const patientCode = params.patientCode;
		if (patientCode === '1000') {
			return response.untyped(badRequest({}));
		}
		if (patientCode === '200000') {
			return response.untyped(noContent());
		}
		return response(200).json(opdDTO);
	}),
	http.get('/opds/search', async ({ request, response }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get('patientCode');
		if (code === '1000') {
			return response.untyped(badRequest({}));
		}
		if (code === '200000') {
			return response.untyped(noContent());
		}
		if (code && parseInt(code, 10) >= 0) {
			return response(200).json({
				data: [opdDTO, opdDTO, opdDTO],
				pageInfo: {},
			});
		}
		return response(200).json({
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
	}),
	http.delete('/opds/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(200).json(true);
	}),
];
