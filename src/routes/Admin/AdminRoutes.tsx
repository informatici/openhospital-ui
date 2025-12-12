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
				element: (
					<AdminActivityContent title={t('nav.wards')}>
						<Wards />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_wards_new),
				element: (
					<AdminActivityContent title={t('ward.addWard')}>
						<NewWard />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_wards_edit),
				element: (
					<AdminActivityContent title={t('ward.editWard')}>
						<EditWard />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('disease.addDisease')}>
						<NewDisease />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_diseases_edit),
				element: (
					<AdminActivityContent title={t('disease.editDisease')}>
						<EditDisease />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('exam.addExam')}>
						<NewExam />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_exams_edit),
				element: (
					<AdminActivityContent title={t('exam.editExam')}>
						<EditExam />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('operation.addOperation')}>
						<NewOperation />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_operations_edit),
				element: (
					<AdminActivityContent title={t('operation.editOperation')}>
						<EditOperation />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('vaccine.addVaccine')}>
						<NewVaccine />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_vaccines_edit),
				element: (
					<AdminActivityContent title={t('vaccine.editVaccine')}>
						<EditVaccine />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('supplier.addNewSupplier')}>
						<NewSupplier />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_suppliers_edit),
				element: (
					<AdminActivityContent title={t('supplier.editSupplier')}>
						<EditSupplier />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('user.addUser')}>
						<NewUser />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_usergroups_new),
				element: (
					<AdminActivityContent title={t('user.addGroup')}>
						<NewGroup />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_usergroups_edit),
				element: (
					<AdminActivityContent title={t('user.editGroup')}>
						<EditGroup />
					</AdminActivityContent>
				),
			},
			{
				path: getPath(PATHS.admin_users_edit),
				element: (
					<AdminActivityContent title={t('nav.users')}>
						<EditUser />
					</AdminActivityContent>
				),
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
				element: (
					<AdminActivityContent title={t('hospital.editHospital')}>
						<EditHospital />
					</AdminActivityContent>
				),
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
