import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router';
import { EditHospital } from '~/components/accessories/admin/hospital';
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
import AdminActivity, {
	AdminActivityContent,
} from '../../components/activities/adminActivity';
import NotFound from '../../components/activities/notFound/NotFound';
import { PATHS } from '../../consts';
import TypesRoutes from './TypesRoutes';

const getPath = (from: string) => from.replace(`${PATHS.admin}/`, '');

export const AdminRoutes = () => {
	const { t } = useTranslation();
	const routes: { element: ReactNode; path: string }[] = useMemo(
		() => [
			{
				path: getPath(PATHS.admin_wards),
				element: <Wards />,
			},
			{
				path: getPath(PATHS.admin_wards_new),
				element: <NewWard />,
			},
			{
				path: getPath(PATHS.admin_wards_edit),
				element: <EditWard />,
			},
			{
				path: getPath(PATHS.admin_diseases),
				element: (
					<AdminActivityContent title={t('nav.diseases')}>
						<Diseases />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_diseases_new),
				element: <NewDisease />,
			},
			{
				path: getPath(PATHS.admin_diseases_edit),
				element: <EditDisease />,
			},
			{
				path: getPath(PATHS.admin_exams),
				element: (
					<AdminActivityContent title={t('nav.exams')}>
						<Exams />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_exams_new),
				element: <NewExam />,
			},
			{
				path: getPath(PATHS.admin_exams_edit),
				element: <EditExam />,
			},
			{
				path: getPath(PATHS.admin_operations),
				element: (
					<AdminActivityContent title={t('nav.operations')}>
						<Operations />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_operations_new),
				element: <NewOperation />,
			},
			{
				path: getPath(PATHS.admin_operations_edit),
				element: <EditOperation />,
			},
			{
				path: getPath(PATHS.admin_vaccines),
				element: (
					<AdminActivityContent title={t('nav.vaccines')}>
						<Vaccines />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_vaccines_new),
				element: <NewVaccine />,
			},
			{
				path: getPath(PATHS.admin_vaccines_edit),
				element: <EditVaccine />,
			},
			{
				path: getPath(PATHS.admin_suppliers),
				element: (
					<AdminActivityContent title={t('nav.suppliers')}>
						<Suppliers />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_suppliers_new),
				element: <NewSupplier />,
			},
			{
				path: getPath(PATHS.admin_suppliers_edit),
				element: <EditSupplier />,
			},
			{
				path: getPath(PATHS.admin_users),
				element: (
					<AdminActivityContent title={t('nav.users')}>
						<Users />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_users_new),
				element: <NewUser />,
			},
			{
				path: getPath(PATHS.admin_usergroups_new),
				element: <NewGroup />,
			},
			{
				path: getPath(PATHS.admin_usergroups_edit),
				element: <EditGroup />,
			},
			{
				path: getPath(PATHS.admin_users_edit),
				element: <EditUser />,
			},
			{
				path: getPath(PATHS.admin_types),
				element: (
					<AdminActivityContent title={t('nav.types')}>
						<TypesRoutes />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_hospital_edit),
				element: <EditHospital />,
			},
		],
		[t],
	);
	return (
		<Routes>
			<Route element={<AdminActivity />}>
				<Route
					index
					element={<Navigate to={getPath(PATHS.admin_wards)} replace />}
				/>
				{routes.map((route) => (
					<Route
						key={route.path.replace('*', '')}
						path={route.path}
						element={route.element}
					/>
				))}
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
