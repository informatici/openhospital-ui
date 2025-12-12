import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { SupplierDTO } from '../../../../../generated';
import { createSupplier } from '../../../../../state/suppliers';
import { getInitialFields } from '../supplierForm/consts';
import SupplierForm from '../supplierForm/SupplierForm';

export const NewSupplier = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const create = useAppSelector((state) => state.suppliers.create);

	const handleSubmit = (value: SupplierDTO) => {
		dispatch(createSupplier(value));
	};

	return (
		<SupplierForm
			creationMode
			onSubmit={handleSubmit}
			isLoading={!!create.isLoading}
			resetButtonLabel={t('common.reset')}
			submitButtonLabel={t('supplier.saveSupplier')}
			fields={getInitialFields(undefined)}
		/>
	);
};
