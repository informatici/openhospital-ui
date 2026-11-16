import { userGroupsDTO } from '../../src/mocks/fixtures/userGroupsDTO';
import { http, jsonResponse, lastPathSegment, notFound } from '../utils';

export const userGroups = [
	http.get('/usergroups', () => jsonResponse(userGroupsDTO)),
	http.get('/usergroups/{id}', (req) => {
		const id = lastPathSegment(req.url);
		const group = userGroupsDTO.find(({ code }) => code === id);
		if (!group) {
			return notFound({
				status: 'BAD_REQUEST',
				message: 'User group not found.',
				debugMessage: 'User group not found.',
				timestamp: '2024-09-16T08:02:53.878312662',
				description: null,
			});
		}
		return jsonResponse(group);
	}),
	http.delete('/usergroups/{code}/permissions/{id}', () => jsonResponse(true)),
	http.post('/usergroups/{code}/permissions/{id}', () => jsonResponse(true)),
	http.post('/usergroups', () => jsonResponse(userGroupsDTO[0])),
	http.put('/usergroups', () => jsonResponse(userGroupsDTO[0])),
	http.delete('/usergroups/{id}', () => jsonResponse(true)),
];
