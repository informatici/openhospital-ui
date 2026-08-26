import { Navigate, useLocation, useParams } from 'react-router';
import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useTranslation } from '~/libraries/hooks';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../../consts';
import type { WardDTO } from '../../../../../generated';
import { updateWard } from '../../../../../state/wards';
import { getInitialFields } from '../wardForm/consts';
import WardForm from '../wardForm/WardForm';

export const EditWard = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { state }: { state: WardDTO | undefined } = useLocation();
	const { id } = useParams();
	const update = useAppSelector((state) => state.wards.update);

	const handleSubmit = (value: WardDTO) => {
		dispatch(updateWard({ ...value, lock: state?.lock }));
	};

	if (state?.code?.toString() !== id?.toString()) {
		return <Navigate to={PATHS.admin_wards} />;
	}

	return (
		<AdminActivityContent title={t('ward.updateWard')}>
			<WardForm
				creationMode={false}
				onSubmit={handleSubmit}
				isLoading={!!update.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('ward.updateWard')}
				fields={getInitialFields(state)}
			/>
		</AdminActivityContent>
	);
};
