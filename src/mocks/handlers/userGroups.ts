import { userGroupsDTO } from '../fixtures/userGroupsDTO';
import { http, noContent, notFound } from '../utils';

export const userGroups = [
	http.get('/usergroups', async ({ response }) => {
		return response(200).json(userGroupsDTO);
	}),
	http.get('/usergroups/{group_code}', async ({ params, response }) => {
		const group = userGroupsDTO.find(({ code }) => code === params.group_code);
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
	http.delete(
		'/usergroups/{group_code}/permissions/{id}',
		async ({ response }) => {
			return response.untyped(noContent());
		},
	),
	http.post(
		'/usergroups/{group_code}/permissions/{id}',
		async ({ params, response }) => {
			return response(201).json(+params.id);
		},
	),
	http.post('/usergroups', async ({ response }) => {
		return response(201).json(userGroupsDTO[0]);
	}),
	http.put('/usergroups/{group_code}', async ({ response }) => {
		return response(200).json(userGroupsDTO[0]);
	}),
	http.delete('/usergroups/{group_code}', async ({ response }) => {
		return response.untyped(noContent());
	}),
];
