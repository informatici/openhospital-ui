import { Navigate, type RouteObject } from 'react-router';
import {
	Diseases,
	EditDisease,
	NewDisease,
} from '../../components/accessories/admin/diseases';
import {
	EditExam,
	Exams,
	NewExam,
} from '../../components/accessories/admin/exams';
import { EditHospital } from '../../components/accessories/admin/hospital';
import {
	EditOperation,
	NewOperation,
	Operations,
} from '../../components/accessories/admin/operations';
import {
	EditSupplier,
	NewSupplier,
	Suppliers,
} from '../../components/accessories/admin/suppliers';
import {
	EditGroup,
	EditUser,
	NewGroup,
	NewUser,
	Users,
} from '../../components/accessories/admin/users';
import {
	EditVaccine,
	NewVaccine,
	Vaccines,
} from '../../components/accessories/admin/vaccines';
import {
	EditWard,
	NewWard,
	Wards,
} from '../../components/accessories/admin/wards';
import AdminActivity from '../../components/activities/adminActivity';
import NotFound from '../../components/activities/notFound/NotFound';
import { PATHS } from '../../consts';
import { TYPES_ROUTES_NO_LAZY } from './types-no-lazy';

const getPath = (from: string) => from.replace(`${PATHS.admin}/`, '');

export const ADMIN_ROUTES_NO_LAZY: RouteObject[] = [
	{
		path: 'admin',
		Component: AdminActivity,
		children: [
			{
				path: '',
				element: <Navigate to="wards" replace />,
			},
			{
				path: 'wards',
				Component: Wards,
			},
			{
				path: getPath(PATHS.admin_wards_new),
				Component: NewWard,
			},
			{
				path: getPath(PATHS.admin_wards_edit),
				Component: EditWard,
			},
			{
				path: getPath(PATHS.admin_diseases),
				Component: Diseases,
			},
			{
				path: getPath(PATHS.admin_diseases_new),
				Component: NewDisease,
			},
			{
				path: getPath(PATHS.admin_diseases_edit),
				Component: EditDisease,
			},
			{
				path: getPath(PATHS.admin_exams),
				Component: Exams,
			},
			{
				path: getPath(PATHS.admin_exams_new),
				Component: NewExam,
			},
			{
				path: getPath(PATHS.admin_exams_edit),
				Component: EditExam,
			},
			{
				path: getPath(PATHS.admin_operations),
				Component: Operations,
			},
			{
				path: getPath(PATHS.admin_operations_new),
				Component: NewOperation,
			},
			{
				path: getPath(PATHS.admin_operations_edit),
				Component: EditOperation,
			},
			{
				path: getPath(PATHS.admin_vaccines),
				Component: Vaccines,
			},
			{
				path: getPath(PATHS.admin_vaccines_new),
				Component: NewVaccine,
			},
			{
				path: getPath(PATHS.admin_vaccines_edit),
				Component: EditVaccine,
			},
			{
				path: getPath(PATHS.admin_suppliers),
				Component: Suppliers,
			},
			{
				path: getPath(PATHS.admin_suppliers_new),
				Component: NewSupplier,
			},
			{
				path: getPath(PATHS.admin_suppliers_edit),
				Component: EditSupplier,
			},
			{
				path: getPath(PATHS.admin_users),
				Component: Users,
			},
			{
				path: getPath(PATHS.admin_users_new),
				Component: NewUser,
			},
			{
				path: getPath(PATHS.admin_usergroups_new),
				Component: NewGroup,
			},
			{
				path: getPath(PATHS.admin_usergroups_edit),
				Component: EditGroup,
			},
			{
				path: getPath(PATHS.admin_users_edit),
				Component: EditUser,
			},
			...TYPES_ROUTES_NO_LAZY,
			{
				path: getPath(PATHS.admin_hospital_edit),
				Component: EditHospital,
			},
			{
				path: 'admin/*',
				Component: NotFound,
			},
		],
	},
];
