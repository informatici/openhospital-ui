import type { PermissionDTO, UserGroupDTO } from '../../generated';
import { permissionDTO } from './permissionDTO';

export const userGroupsDTO: UserGroupDTO[] = [
	{ code: 'adm', desc: 'admin', permissions: permissionDTO },
	{
		code: 'con',
		desc: 'contributor',
		permissions: permissionDTO.reduce((acc: PermissionDTO[], curr, i) => {
			const value = acc;
			return i % 5 === 0 ? [...value, curr] : acc;
		}, []),
	},
	{
		code: 'guest',
		permissions: permissionDTO.reduce((acc: PermissionDTO[], curr) =>
			// only permissions ending with "read"
			{
				const value = acc;

				return /read$/.test(curr.name ?? '') ? [...value, curr] : acc;
			}, []),
	},
	{
		code: 'bot',
		permissions: permissionDTO.reduce((acc: PermissionDTO[], curr) =>
			// only permissions ending with "update" or "delete"
			{
				const value = acc;
				return /(update|delete)$/.test(curr.name ?? '')
					? [...value, curr]
					: acc;
			}, []),
	},
	{
		code: 'labo',
		permissions: permissionDTO.reduce((acc: PermissionDTO[], curr) =>
			// only examinations
			{
				const value = acc;

				return curr.name === 'laboratories.access' ||
					/^examinations/.test(curr.name ?? '')
					? [...value, curr]
					: acc;
			}, []),
	},
	{ code: 'doc' },
];
