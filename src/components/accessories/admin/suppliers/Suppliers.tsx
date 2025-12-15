import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { deleteSupplier } from '~/state/suppliers';
import { PATHS } from '../../../../consts';
import type { SupplierDTO } from '../../../../generated';
import Button from '../../button/Button';
import SuppliersTable from './suppliersTable';

export const Suppliers = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const handleEdit = (row: SupplierDTO) => {
		navigate(PATHS.admin_suppliers_edit.replace(':id', `${row.supId}`), {
			state: row,
		});
	};

	const handleDelete = (row: SupplierDTO) => {
		dispatch(deleteSupplier(row.supId));
	};

	return (
		<AdminActivityContent title={t('nav.suppliers')}>
			<SuppliersTable
				onEdit={handleEdit}
				onDelete={handleDelete}
				headerActions={
					<Button
						onClick={() => {
							navigate(PATHS.admin_suppliers_new);
						}}
						type="button"
						variant="contained"
						color="primary"
					>
						{t('supplier.addSupplier')}
					</Button>
				}
			/>
		</AdminActivityContent>
	);
};
