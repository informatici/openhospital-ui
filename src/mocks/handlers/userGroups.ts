import { userGroupsDTO } from '../fixtures/userGroupsDTO';
import { http, notFound } from '../utils';

export const userGroups = [
	http.get('/usergroups', async ({ response }) => {
		return response(200).json(userGroupsDTO);
	}),
	http.get('/usergroups/{id}', async ({ params, response }) => {
		const group = userGroupsDTO.find(({ code }) => code === params.id);
		if (!group) {
			return response.untyped(
				notFound({
					status: 'BAD_REQUEST',
					message: 'User group not found.',
					debugMessage: 'User group not found.',
					timestamp: '2024-09-16T08:02:53.878312662',
					description: null,
				}),
			);
		}
		return response(200).json(group);
	}),
	http.delete('/usergroups/{code}/permissions/{id}', async ({ response }) => {
		return response(200).json(true);
	}),
	http.post('/usergroups/{code}/permissions/{id}', async ({ response }) => {
		return response(200).json(true);
	}),
	http.post('/usergroups', async ({ response }) => {
		return response(200).json(userGroupsDTO[0]);
	}),
	http.put('/usergroups', async ({ response }) => {
		return response(200).json(userGroupsDTO[0]);
	}),
	http.delete('/usergroups/{id}', async ({ response }) => {
		return response(200).json(true);
	}),
];
