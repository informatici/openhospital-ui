import { Navigate, type RouteObject } from 'react-router';
import AdminActivity from '../../components/activities/adminActivity';
import { PATHS } from '../../consts';

const getPath = (from: string) => from.replace(`${PATHS.admin}/`, '');

export const ADMIN_ROUTES: RouteObject[] = [
	{
		path: '',
		element: <Navigate to="wards" replace />,
	},
	{
		path: 'wards',
		lazy: async () =>
			import('../../components/accessories/admin/wards').then((module) => ({
				Component: module.Wards,
			})),
	},
	{
		path: getPath(PATHS.admin_wards_new),
		lazy: async () =>
			import('../../components/accessories/admin/wards').then((module) => ({
				Component: module.NewWard,
			})),
	},
	{
		path: getPath(PATHS.admin_wards_edit),
		lazy: async () =>
			import('../../components/accessories/admin/wards').then((module) => ({
				Component: module.EditWard,
			})),
	},
	{
		path: getPath(PATHS.admin_diseases),
		lazy: async () =>
			import('../../components/accessories/admin/diseases').then((module) => ({
				Component: module.Diseases,
			})),
	},
	{
		path: getPath(PATHS.admin_diseases_new),
		lazy: async () =>
			import('../../components/accessories/admin/diseases').then((module) => ({
				Component: module.NewDisease,
			})),
	},
	{
		path: getPath(PATHS.admin_diseases_edit),
		lazy: async () =>
			import('../../components/accessories/admin/diseases').then((module) => ({
				Component: module.EditDisease,
			})),
	},
	{
		path: getPath(PATHS.admin_exams),
		lazy: async () =>
			import('../../components/accessories/admin/exams').then((module) => ({
				Component: module.Exams,
			})),
	},
	{
		path: getPath(PATHS.admin_exams_new),
		lazy: async () =>
			import('../../components/accessories/admin/exams').then((module) => ({
				Component: module.NewExam,
			})),
	},
	{
		path: getPath(PATHS.admin_exams_edit),
		lazy: async () =>
			import('../../components/accessories/admin/exams').then((module) => ({
				Component: module.EditExam,
			})),
	},
	{
		path: getPath(PATHS.admin_operations),
		lazy: async () =>
			import('../../components/accessories/admin/operations').then(
				(module) => ({
					Component: module.Operations,
				}),
			),
	},
	{
		path: getPath(PATHS.admin_operations_new),
		lazy: async () =>
			import('../../components/accessories/admin/operations').then(
				(module) => ({
					Component: module.NewOperation,
				}),
			),
	},
	{
		path: getPath(PATHS.admin_operations_edit),
		lazy: async () =>
			import('../../components/accessories/admin/operations').then(
				(module) => ({
					Component: module.EditOperation,
				}),
			),
	},
	{
		path: getPath(PATHS.admin_vaccines),
		lazy: async () =>
			import('../../components/accessories/admin/vaccines').then((module) => ({
				Component: module.Vaccines,
			})),
	},
	{
		path: getPath(PATHS.admin_vaccines_new),
		lazy: async () =>
			import('../../components/accessories/admin/vaccines').then((module) => ({
				Component: module.NewVaccine,
			})),
	},
	{
		path: getPath(PATHS.admin_vaccines_edit),
		lazy: async () =>
			import('../../components/accessories/admin/vaccines').then((module) => ({
				Component: module.EditVaccine,
			})),
	},
	{
		path: getPath(PATHS.admin_suppliers),
		lazy: async () =>
			import('../../components/accessories/admin/suppliers').then((module) => ({
				Component: module.Suppliers,
			})),
	},
	{
		path: getPath(PATHS.admin_suppliers_new),
		lazy: async () =>
			import('../../components/accessories/admin/suppliers').then((module) => ({
				Component: module.NewSupplier,
			})),
	},
	{
		path: getPath(PATHS.admin_suppliers_edit),
		lazy: async () =>
			import('../../components/accessories/admin/suppliers').then((module) => ({
				Component: module.EditSupplier,
			})),
	},
	{
		path: getPath(PATHS.admin_users),
		lazy: async () =>
			import('../../components/accessories/admin/users').then((module) => ({
				Component: module.Users,
			})),
	},
	{
		path: getPath(PATHS.admin_users_new),
		lazy: async () =>
			import('../../components/accessories/admin/users').then((module) => ({
				Component: module.NewUser,
			})),
	},
	{
		path: getPath(PATHS.admin_usergroups_new),
		lazy: async () =>
			import('../../components/accessories/admin/users').then((module) => ({
				Component: module.NewGroup,
			})),
	},
	{
		path: getPath(PATHS.admin_usergroups_edit),
		lazy: async () =>
			import('../../components/accessories/admin/users').then((module) => ({
				Component: module.EditGroup,
			})),
	},
	{
		path: getPath(PATHS.admin_users_edit),
		lazy: async () =>
			import('../../components/accessories/admin/users').then((module) => ({
				Component: module.EditUser,
			})),
	},
	{
		path: getPath(PATHS.admin_types),
		lazy: async () =>
			import('./types').then((module) => ({
				Component: module.TypesAdmin,
				children: module.TYPES_ROUTES,
			})),
	},
	{
		path: getPath(PATHS.admin_hospital_edit),
		lazy: async () =>
			import('../../components/accessories/admin/hospital').then((module) => ({
				Component: module.EditHospital,
			})),
	},
	{
		path: 'admin/*',
		lazy: async () =>
			import('../../components/activities/notFound/NotFound').then(
				(module) => ({
					Component: module.NotFound,
				}),
			),
	},
];

export { AdminActivity };
