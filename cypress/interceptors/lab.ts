import { isEmpty } from 'lodash';
import { LaboratoryDTOStatusEnum } from '../../src/generated';
import { laboratoryDTO } from '../../src/mocks/fixtures/laboratoryDTO';
import { labWithRowsDTO } from '../../src/mocks/fixtures/labWithRowsDTO';
import { materialsDTO } from '../../src/mocks/fixtures/materialsDTO';
import {
	badRequest,
	genericPathExcluding,
	http,
	jsonResponse,
	lastPathSegment,
	noContent,
	queryParam,
} from '../utils';

export const lab = [
	http.get('/laboratories/byPatientId/{patId}', (req) => {
		const code = lastPathSegment(req.url);
		switch (code) {
			case '1000':
				return badRequest(null);
			case '2000':
				return noContent();
			default:
				return jsonResponse(
					labWithRowsDTO.filter(
						(lab) =>
							lab.laboratoryDTO?.status !== LaboratoryDTOStatusEnum.Open &&
							lab.laboratoryDTO?.status !== LaboratoryDTOStatusEnum.Draft,
					),
				);
		}
	}),

	http.get('/laboratories/examRequest/{patId}', (req) => {
		const code = lastPathSegment(req.url);
		switch (code) {
			case '1000':
				return badRequest(null);
			case '2000':
				return noContent();
			default:
				return jsonResponse(
					laboratoryDTO.filter(
						(lab) =>
							lab.status === LaboratoryDTOStatusEnum.Open ||
							lab.status === LaboratoryDTOStatusEnum.Draft,
					),
				);
		}
	}),

	http.get('/laboratories/exams/{code}', (req) => {
		const code = lastPathSegment(req.url);
		const foundLab = labWithRowsDTO.find(
			(e) => e.laboratoryDTO?.code === +code,
		);
		switch (code) {
			case '1000':
				return badRequest(null);
			case '2000':
				return noContent();
			default:
				return isEmpty(foundLab)
					? { statusCode: 404, body: null }
					: jsonResponse(foundLab);
		}
	}),

	{
		method: 'GET' as const,
		// Excludes `exams`/`materials` so this doesn't also swallow those routes.
		url: genericPathExcluding('/laboratories', ['exams', 'materials']),
		routeHandler: (req: Cypress.Request) => {
			const code = lastPathSegment(req.url);
			const foundLab = laboratoryDTO.find((e) => e.code === +code);
			switch (code) {
				case '1000':
					return badRequest(null);
				case '2000':
					return noContent();
				default:
					return isEmpty(foundLab)
						? { statusCode: 404, body: null }
						: jsonResponse(foundLab);
			}
		},
	},

	http.get('/laboratories/exams', (req) => {
		const code = queryParam(req.url, 'patientCode');
		switch (code) {
			case '1000':
				return badRequest(null);
			case '200000':
				return noContent();
			default: {
				const page = queryParam(req.url, 'page');
				return jsonResponse({
					data: labWithRowsDTO,
					pageInfo: {
						totalPage: 8,
						page: page && !Number.isNaN(+page) ? parseInt(page, 10) : 0,
					},
				});
			}
		}
	}),

	http.post('/laboratories', (req) => {
		const body = req.body;
		if (body.laboratoryDTO.note === 'ERROR') {
			return badRequest(null);
		}
		return jsonResponse({ laboratoryDTO: body.laboratoryDTO }, 201);
	}),

	// POST /laboratories/examRequest is handled by `labExamRequest.ts`, which is
	// registered after this one, so it's the one that actually wins.

	http.delete('/laboratories/{code}', (req) => {
		if (lastPathSegment(req.url) === '-1') {
			return badRequest(null);
		}
		return { statusCode: 201, body: null };
	}),

	http.put('/laboratories/{code}', (req) => {
		if (lastPathSegment(req.url) === '-1') {
			return badRequest(null);
		}
		return jsonResponse(labWithRowsDTO[0], 201);
	}),

	http.get('/laboratories/materials', () => jsonResponse(materialsDTO)),
];
