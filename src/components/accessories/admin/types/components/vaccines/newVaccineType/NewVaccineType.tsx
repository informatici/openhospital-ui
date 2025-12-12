import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { VaccineTypeDTO } from '../../../../../../../generated';
import { setTypeMode } from '../../../../../../../state/types/config';
import { createVaccineType } from '../../../../../../../state/types/vaccines';
import { getInitialFields } from '../vaccineTypesForm/consts';
import VaccineTypeForm from '../vaccineTypesForm/VaccineTypeForm';
import './styles.scss';

export const NewVaccineType = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const create = useAppSelector((state) => state.types.vaccines.create);

	useEffect(() => {
		dispatch(setTypeMode('edit'));
	});

	const handleSubmit = (value: VaccineTypeDTO) => {
		dispatch(createVaccineType(value));
	};

	return (
		<div className="newVaccineType">
			<h3 data-cy="sub-activity-title" className="title">
				{t('vaccineTypes.addVaccineType')}
			</h3>
			<VaccineTypeForm
				creationMode
				onSubmit={handleSubmit}
				isLoading={!!create.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('vaccineTypes.saveVaccineTypes')}
				fields={getInitialFields(undefined)}
			/>
		</div>
	);
};
