import { Skeleton } from '@mui/material';
import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { getAgeTypes } from '~/state/types/ageTypes';
import { useOpdByAgeTypeData } from '../../../../../libraries/dashboardUtils/opds/useOpdByAgeTypeData';
import { searchOpds } from '../../../../../state/opds';
import { Barchart } from '../../../charts/bar/Barchart';
import DataDownloadButton from '../../../dataDownloadButton/DataDownloadButton';
import { DashboardCard } from '../../card/DashboardCard';
import '../../card/styles.scss';
import type { TDashboardCardOptionActions } from '../../card/types';
import { useDisplaySize } from '../../hooks';
import type { TDashboardComponentProps } from '../../layouts/types';
import { DataSummary } from '../../summary/DataSummary';
import type { IOwnProps } from '../types';

export const OpdByAgeTypes: FC<TDashboardComponentProps & IOwnProps> = ({
	onRemove,
	onFullScreenEnter,
	period,
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(searchOpds({ dateFrom: period[0], dateTo: period[1] }));
		dispatch(getAgeTypes());
	}, [dispatch, period]);

	const { status, ageTypeStatus, data, success, total, csvData } =
		useOpdByAgeTypeData();

	const { displaySize, onSizeChange } = useDisplaySize();

	const downloadOptions = (
		<DataDownloadButton
			csvData={csvData}
			title={t('opd.opdbyagetype').replace(/ /g, '-')}
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
			{status === 'LOADING' ||
				(ageTypeStatus === 'LOADING' && (
					<div className="item">
						<Skeleton />
					</div>
				))}

			{success && ageTypeStatus === 'SUCCESS' && (
				<DashboardCard
					cardRef={cardRef}
					title={t('opd.opdbyagetype')}
					actions={actions}
					sizeChangeHandler={onSizeChange}
				>
					<Barchart data={data} width={'100%'} height={'calc(100% - 75px)'} />
					<DataSummary
						label={t('opd.opdregistered')}
						value={total.toString()}
					/>
				</DashboardCard>
			)}
		</>
	);
};
