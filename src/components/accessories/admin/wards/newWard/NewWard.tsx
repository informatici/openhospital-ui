import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useTranslation } from '~/libraries/hooks';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { WardDTO } from '../../../../../generated';
import { createWard } from '../../../../../state/wards';
import { getInitialFields } from '../wardForm/consts';
import WardForm from '../wardForm/WardForm';

export const NewWard = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const create = useAppSelector((state) => state.wards.create);

	const handleSubmit = (value: WardDTO) => {
		dispatch(createWard(value));
	};

	return (
		<AdminActivityContent title={t('ward.addWard')}>
			<WardForm
				creationMode
				onSubmit={handleSubmit}
				isLoading={!!create.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('ward.saveWard')}
				fields={getInitialFields(undefined)}
			/>
		</AdminActivityContent>
	);
};
