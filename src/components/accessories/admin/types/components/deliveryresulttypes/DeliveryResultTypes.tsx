import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../../../consts';
import type { DeliveryResultTypeDTO } from '../../../../../../generated';
import { setTypeMode } from '../../../../../../state/types/config';
import {
	deleteDeliveryResultType,
	deleteDeliveryResultTypeReset,
	getDeliveryResultTypes,
} from '../../../../../../state/types/deliveryResults';
import Button from '../../../../button/Button';
import DeliveryResultTypeTable from './deliveryResultTypeTable';
import './styles.scss';

export const DeliveryResultTypes = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getDeliveryResultTypes());
		dispatch(setTypeMode('manage'));

		return () => {
			dispatch(deleteDeliveryResultTypeReset());
		};
	}, [dispatch]);

	const handleEdit = (row: DeliveryResultTypeDTO) => {
		navigate(
			PATHS.admin_delivery_result_types_edit.replace(':code', row.code ?? ''),
			{
				state: row,
			},
		);
	};

	const handleDelete = (row: DeliveryResultTypeDTO) => {
		dispatch(deleteDeliveryResultType(row.code ?? ''));
	};

	const { t } = useTranslation();
	return (
		<>
			<h3 data-cy="sub-activity-title">{t('deliveryResultType.title')}</h3>

			<div className="deliveryResultTypes" data-cy="deliveryresult-types-table">
				<DeliveryResultTypeTable
					onEdit={handleEdit}
					onDelete={handleDelete}
					headerActions={
						<Button
							onClick={() => {
								navigate('./new');
							}}
							type="button"
							variant="contained"
							color="primary"
							dataCy="add-deliveryresult-type"
						>
							{t('deliveryResultType.addDeliveryResultType')}
						</Button>
					}
				/>
			</div>
		</>
	);
};
