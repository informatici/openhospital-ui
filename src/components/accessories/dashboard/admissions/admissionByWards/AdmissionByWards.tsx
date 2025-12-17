import { Skeleton } from '@mui/material';
import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { useAdmByAdmWardData } from '../../../../../libraries/dashboardUtils/admissions/useAdmByWardData';
import { getAdmissions } from '../../../../../state/admissions';
import { getWards } from '../../../../../state/wards';
import { Barchart } from '../../../charts/bar/Barchart';
import DataDownloadButton from '../../../dataDownloadButton/DataDownloadButton';
import { DashboardCard } from '../../card/DashboardCard';
import type { TDashboardCardOptionActions } from '../../card/types';
import type { TDashboardComponentProps } from '../../layouts/types';
import { DataSummary } from '../../summary/DataSummary';
import type { IOwnProps } from '../types';

import '../../card/styles.scss';
import { useDisplaySize } from '../../hooks';

export const AdmissionsByWards: FC<TDashboardComponentProps & IOwnProps> = ({
	onRemove,
	onFullScreenEnter,
	period,
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(getWards());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAdmissions({ admissionrange: period }));
	}, [period, dispatch]);

	const { total, success, status, wardStatus, data, csvData } =
		useAdmByAdmWardData();

	const { onSizeChange } = useDisplaySize();

	const downloadOptions = (
		<DataDownloadButton
			csvData={csvData}
			title={t('admission.admissionbywards').replace(/ /g, '-')}
			graphRef={cardRef}
		/>
	);

	const actions: TDashboardCardOptionActions = {
		onClose: onRemove ? () => onRemove() : undefined,

		onExpand: onFullScreenEnter ? () => onFullScreenEnter() : undefined,

		downloadButton: downloadOptions,
	};

	return (
		<>
			{(status === 'LOADING' || wardStatus === 'LOADING') && (
				<div className="item">
					<Skeleton />
				</div>
			)}

			{success && wardStatus === 'SUCCESS' && (
				<DashboardCard
					cardRef={cardRef}
					title={t('admission.admissionbywards')}
					actions={actions}
					sizeChangeHandler={onSizeChange}
				>
					<Barchart data={data} width={'100%'} height={'calc(100% - 75px)'} />
					<DataSummary
						label={t('admission.admregistered')}
						value={total.toString()}
					/>
				</DashboardCard>
			)}
		</>
	);
};
