import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../../consts';
import type { DiseaseDTO } from '../../../../../generated';
import { updateDisease } from '../../../../../state/diseases';
import { getInitialFields } from '../diseaseForm/consts';
import DiseaseForm from '../diseaseForm/DiseaseForm';

export const EditDisease = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { state }: { state: DiseaseDTO | undefined } = useLocation();
	const { id } = useParams();
	const update = useAppSelector((state) => state.diseases.update);

	const handleSubmit = (value: DiseaseDTO) => {
		dispatch(updateDisease({ ...value, lock: state?.lock }));
	};

	if (state?.code?.toString() !== id?.toString()) {
		return <Navigate to={PATHS.admin_diseases} />;
	}

	return (
		<DiseaseForm
			creationMode={false}
			onSubmit={handleSubmit}
			isLoading={!!update.isLoading}
			resetButtonLabel={t('common.reset')}
			submitButtonLabel={t('disease.updateDisease')}
			fields={getInitialFields(state)}
		/>
	);
};
