import { isEmpty } from 'lodash';
import { LaboratoryDTOStatusEnum } from '~/generated';
import { laboratoryDTO } from '../fixtures/laboratoryDTO';
import { labWithRowsDTO } from '../fixtures/labWithRowsDTO';
import { materialsDTO } from '../fixtures/materialsDTO';
import { badRequest, http, noContent, notFound } from '../utils';

export const laboratories = [
	http.get(
		'/laboratories/byPatientId/{patId}',
		async ({ params, response }) => {
			const patId = params.patId;
			if (patId === '1000') {
				return response.untyped(badRequest({ message: 'Request failed' }));
			}
			if (patId === '2000') {
				return response.untyped(noContent());
			}
			return response(200).json(
				labWithRowsDTO.filter(
					(lab) =>
						lab.laboratoryDTO?.status !== LaboratoryDTOStatusEnum.Open &&
						lab.laboratoryDTO?.status !== LaboratoryDTOStatusEnum.Draft,
				),
			);
		},
	),
	http.get(
		'/laboratories/examRequest/patient/{patId}',
		async ({ params, response }) => {
			const patId = params.patId;
			if (patId === '1000') {
				return response.untyped(badRequest({ message: 'Request failed' }));
			}
			if (patId === '2000') {
				return response.untyped(noContent());
			}
			return response(200).json(
				laboratoryDTO.filter(
					(lab) =>
						lab.status === LaboratoryDTOStatusEnum.Open ||
						lab.status === LaboratoryDTOStatusEnum.Draft,
				),
			);
		},
	),
	http.get('/laboratories/exams/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '1000') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		if (code === '2000') {
			return response.untyped(noContent());
		}
		const lab = labWithRowsDTO.find((e) => e.laboratoryDTO?.code === +code);
		if (isEmpty(lab)) {
			return response.untyped(notFound({ message: 'Not found' }));
		}
		return response(200).json(lab);
	}),
	http.get('/laboratories/exams', async ({ query, response }) => {
		const code = query.get('patientCode');
		if (code === '1000') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		if (code === '200000') {
			return response.untyped(noContent());
		}
		const page = query.get('page');
		const pageNum = page ? parseInt(page, 10) : 0;
		return response(200).json({
			data: labWithRowsDTO,
			pageInfo: {
				totalPages: 8,
				page: pageNum,
			},
		});
	}),
	http.post('/laboratories', async ({ request, response }) => {
		const body = await request.json();
		if (body.laboratoryDTO?.note === 'ERROR') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		return response(201).json(true);
	}),
	http.post('/laboratories/examRequest', async ({ response }) => {
		return response(201).json(true);
	}),
	http.delete('/laboratories/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '-1') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		return response.untyped(noContent());
	}),
	http.put('/laboratories/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '-1') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		return response(200).json(true);
	}),
	http.get('/laboratories/materials', async ({ response }) => {
		return response(200).json(materialsDTO);
	}),
	http.get('/laboratories/{code}', async ({ params, response }) => {
		const code = params.code;
		if (code === '1000') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		if (code === '2000') {
			return response.untyped(noContent());
		}
		const lab = laboratoryDTO.find((e) => e.code === +code);
		if (isEmpty(lab)) {
			return response.untyped(notFound({ message: 'Exam lab not found' }));
		}
		return response(200).json(lab);
	}),
];
