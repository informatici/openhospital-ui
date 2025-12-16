import { isEmpty } from 'lodash';
import { labDTO } from '../fixtures/laboratoryDTO';
import { labWithRowsDTO } from '../fixtures/labWithRowsDTO';
import { materialsDTO } from '../fixtures/materialsDTO';
import { badRequest, http, notFound } from '../utils';

export const lab = [
	http.get(
		'/laboratories/byPatientId/{patId}',
		async ({ params, response }) => {
			const patId = params.patId;
			if (patId === '1000') {
				return response.untyped(badRequest({}));
			}
			if (patId === '2000') {
				return response(204);
			}
			return response(200).json(
				labWithRowsDTO.filter(
					(lab) =>
						lab.laboratoryDTO.status !== 'OPEN' &&
						lab.laboratoryDTO.status !== 'DRAFT',
				),
			);
		},
	),
	http.get(
		'/laboratories/examRequest/{patId}',
		async ({ params, response }) => {
			const patId = params.patId;
			if (patId === '1000') {
				return response.untyped(badRequest({}));
			}
			if (patId === '2000') {
				return response(204);
			}
			return response(200).json(
				labDTO.filter((lab) => lab.status === 'OPEN' || lab.status === 'DRAFT'),
			);
		},
	),
	http.get('/laboratories/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '1000') {
			return response.untyped(badRequest({}));
		}
		if (code === '2000') {
			return response(204);
		}
		const lab = labDTO.find((e) => e.code === code);
		if (isEmpty(lab)) {
			return response.untyped(notFound({}));
		}
		return response(200).json(lab);
	}),
	http.get('/laboratories/exams/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '1000') {
			return response.untyped(badRequest({}));
		}
		if (code === '2000') {
			return response(204);
		}
		const lab = labWithRowsDTO.find((e) => e.laboratoryDTO.code === code);
		if (isEmpty(lab)) {
			return response.untyped(notFound({}));
		}
		return response(200).json(lab);
	}),
	http.get('/laboratories/exams', async ({ request, response }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get('patientCode');
		if (code === '1000') {
			return response.untyped(badRequest({}));
		}
		if (code === '200000') {
			return response(204);
		}
		const page = url.searchParams.get('page');
		const pageNum = page ? parseInt(page, 10) : 0;
		return response(200).json({
			data: labWithRowsDTO,
			pageInfo: {
				totalPage: 8,
				page: pageNum,
			},
		});
	}),
	http.post('/laboratories', async ({ request, response }) => {
		const body = await request.json();
		if (body.laboratoryDTO.note === 'ERROR') {
			return response.untyped(badRequest({}));
		}
		return response(201).json({ laboratoryDTO: body.laboratoryDTO });
	}),
	http.post('/laboratories/examRequest', async ({ request, response }) => {
		const body = await request.json();
		return response(201).json({ laboratoryDTO: body.laboratoryDTO });
	}),
	http.delete('/laboratories/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '-1') {
			return response.untyped(badRequest({}));
		}
		return response(201);
	}),
	http.put('/laboratories/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '-1') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(labWithRowsDTO[0]);
	}),
	http.get('/laboratories/materials', async ({ response }) => {
		return response(200).json(materialsDTO);
	}),
];
