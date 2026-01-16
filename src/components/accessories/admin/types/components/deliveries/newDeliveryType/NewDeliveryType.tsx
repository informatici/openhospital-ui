import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { DeliveryTypeDTO } from '../../../../../../../generated';
import { setTypeMode } from '../../../../../../../state/types/config';
import { createDeliveryType } from '../../../../../../../state/types/deliveries';
import { getInitialFields } from '../deliveryTypesForm/consts';
import DeliveryTypeForm from '../deliveryTypesForm/DeliveryTypeForm';
import './styles.scss';

export const NewDeliveryType = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const create = useAppSelector((state) => state.types.deliveries.create);

	useEffect(() => {
		dispatch(setTypeMode('edit'));
	});

	const handleSubmit = (value: DeliveryTypeDTO) => {
		dispatch(createDeliveryType(value));
	};

	return (
		<div className="newDeliveryType">
			<h3 className="title" data-cy="sub-delivery-title">
				{t('deliveryTypes.addDeliveryType')}
			</h3>
			<DeliveryTypeForm
				creationMode
				onSubmit={handleSubmit}
				isLoading={!!create.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('deliveryTypes.saveDeliveryTypes')}
				fields={getInitialFields(undefined)}
			/>
		</div>
	);
};
