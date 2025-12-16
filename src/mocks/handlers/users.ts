import { dashboardSettingDTO } from '../fixtures/dashboardSettingDTO';
import permissionList from '../fixtures/permissionList';
import { usersDTO } from '../fixtures/usersDTO';
import { badRequest, http } from '../utils';

export const users = [
	http.get('/users/me', async ({ response }) => {
		return response(200).json({
			userName: 'admin',
			permissions: permissionList,
			userGroupName: 'ADMIN',
			userDesc: 'John Doe',
		});
	}),
	http.get('/users/settings', async ({ response }) => {
		return response(200).json([
			{ id: 1, configName: 'landing', configValue: '/' },
		]);
	}),
	http.get('/users', async ({ response }) => {
		return response(200).json(usersDTO);
	}),
	http.get('/users/{username}', async ({ response }) => {
		return response(200).json(usersDTO[0]);
	}),
	http.post('/users', async ({ response }) => {
		return response(200).json(usersDTO[0]);
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
		return response(204);
	}),
	http.get('/users/{username}/settings/dashboard', async ({ response }) => {
		return response(200).json(dashboardSettingDTO);
	}),
	http.put('/users/settings/{code}', async ({ request, response }) => {
		const body = await request.json();
		return response(200).json(body);
	}),
	http.post('/users/settings', async ({ request, response }) => {
		const body = await request.json();
		return response(200).json(body);
	}),
];
