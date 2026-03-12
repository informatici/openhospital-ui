import { permissionList } from '../fixtures/permissionList';
import { userGroupsDTO } from '../fixtures/userGroupsDTO';
import { usersDTO } from '../fixtures/usersDTO';
import { badRequest, http, noContent } from '../utils';

export const users = [
	http.get('/users/me', async ({ response }) => {
		return response(200).json({
			userName: 'admin',
			permissions: permissionList,
			userGroup: userGroupsDTO[0],
		});
	}),
	http.get('/users', async ({ response }) => {
		return response(200).json(usersDTO);
	}),
	http.get('/users/{username}', async ({ response }) => {
		return response(200).json(usersDTO[0]);
	}),
	http.post('/users', async ({ response }) => {
		return response(201).json(usersDTO[0]);
	}),
	http.put('/users/{username}', async ({ request, response }) => {
		const body = await request.json();
		return response(200).json(body);
	}),
	http.delete('/users/{username}', async ({ params, response }) => {
		const username = params.username;
		if (username === 'FAIL') {
			return response.untyped(badRequest({ message: 'Fail to delete user' }));
		}
		return response.untyped(noContent());
	}),
];
