import { permissionList } from '../../src/mocks/fixtures/permissionList';
import { usersDTO } from '../../src/mocks/fixtures/usersDTO';
import {
	badRequest,
	genericPathExcluding,
	http,
	jsonResponse,
	lastPathSegment,
	noContent,
} from '../utils';

export const users = [
	http.get('/users', () => jsonResponse(usersDTO)),
	{
		method: 'GET' as const,
		// Excludes `me`/`settings` so this doesn't also swallow those routes.
		url: genericPathExcluding('/users', ['me', 'settings']),
		routeHandler: () => jsonResponse(usersDTO[0]),
	},
	http.get('/users/me', () =>
		jsonResponse({
			userName: 'admin',
			permissions: permissionList,
			userGroupName: 'ADMIN',
			userDesc: 'John Doe',
		}),
	),
	http.get('/users/settings', () =>
		jsonResponse([{ id: 1, configName: 'landing', configValue: '/' }]),
	),
	http.post('/users', () => jsonResponse(usersDTO[0])),
	http.put('/users/{username}', (req) => jsonResponse(req.body)),
	http.delete('/users/{username}', (req) => {
		if (lastPathSegment(req.url) === 'FAIL') {
			return badRequest({ message: 'Fail to delete user' });
		}
		return noContent();
	}),
];
