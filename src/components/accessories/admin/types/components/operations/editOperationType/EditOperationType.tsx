import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../../../../consts';
import type { OperationTypeDTO } from '../../../../../../../generated';
import { setTypeMode } from '../../../../../../../state/types/config';
import { updateOperationType } from '../../../../../../../state/types/operations';
import { getInitialFields } from '../operationTypesForm/consts';
import OperationTypeForm from '../operationTypesForm/OperationTypeForm';
import './styles.scss';

export const EditOperationType = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { state }: { state: OperationTypeDTO | undefined } = useLocation();
	const { code } = useParams();
	const update = useAppSelector((state) => state.types.operations.update);

	const mode = useAppSelector((state) => state.types.config.mode);

	const handleSubmit = (code: string, value: OperationTypeDTO) => {
		dispatch(updateOperationType({ code, operationTypeDTO: value }));
	};

	useEffect(() => {
		if (mode !== 'edit') {
			dispatch(setTypeMode('edit'));
		}
	}, [mode, dispatch]);

	if (state?.code !== code) {
		return <Navigate to={PATHS.admin_operations_types} />;
	}

	return (
		<div className="editOperationType">
			<h3 className="title" data-cy="sub-operation-title">
				{t('operationTypes.editOperationType')}
			</h3>
			<OperationTypeForm
				creationMode={false}
				onSubmit={handleSubmit}
				isLoading={!!update.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('operationTypes.updateOperationType')}
				fields={getInitialFields(state)}
			/>
		</div>
	);
};
