import patientDTO, { patientDTO2 } from '../../src/mocks/fixtures/patientDTO';
import patientDTOOut from '../../src/mocks/fixtures/patientDTOOut';
import {
	badRequest,
	genericPathExcluding,
	http,
	jsonResponse,
	lastPathSegment,
	noContent,
	queryParam,
} from '../utils';

export const patients = [
	http.post('/patients', (req) => {
		const body = req.body;
		if (body.firstName === 'fail') {
			return badRequest(null);
		}
		return jsonResponse({ ...body, code: 1 }, 201);
	}),
	{
		method: 'GET' as const,
		// Excludes `search` so this doesn't also swallow GET /patients/search.
		url: genericPathExcluding('/patients', ['search']),
		routeHandler: (req: Cypress.Request) => {
			const code = lastPathSegment(req.url);
			switch (code) {
				case '1234561':
					return badRequest(null);
				case '1234562':
					return noContent();
				case '1234563':
					return jsonResponse({ ...patientDTOOut, code });
				default:
					return jsonResponse({ ...patientDTO, code });
			}
		},
	},
	http.put('/patients/{code}', (req) => {
		const code = lastPathSegment(req.url);
		switch (code) {
			case '1234561':
				return badRequest(null);
			case '1234562':
				return noContent();
			default:
				return jsonResponse(patientDTO);
		}
	}),
	http.get('/patients/search', (req) => {
		const firstName = queryParam(req.url, 'firstName');
		switch (firstName) {
			case 'empty':
				return jsonResponse([]);
			case 'unexpected':
				return jsonResponse({});
			case 'fail':
				return badRequest(null);
			default:
				return jsonResponse([
					patientDTO,
					patientDTO,
					patientDTO,
					patientDTO,
					patientDTO,
					patientDTO2,
				]);
		}
	}),
];
