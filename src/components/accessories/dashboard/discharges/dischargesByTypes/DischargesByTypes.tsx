import { Skeleton } from '@mui/material';
import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { useDisByDisTypeData } from '../../../../../libraries/dashboardUtils/discharges/useDisByDisTypeData';
import { getDischarges } from '../../../../../state/admissions';
import { getDischargeTypes } from '../../../../../state/types/discharges';
import { Piechart } from '../../../charts/pie/Piechart';
import DataDownloadButton from '../../../dataDownloadButton/DataDownloadButton';
import { DashboardCard } from '../../card/DashboardCard';
import '../../card/styles.scss';
import type { TDashboardCardOptionActions } from '../../card/types';
import { useDisplaySize } from '../../hooks';
import type { TDashboardComponentProps } from '../../layouts/types';
import { DataSummary } from '../../summary/DataSummary';
import type { IOwnProps } from '../types';

export const DischargesByTypes: FC<TDashboardComponentProps & IOwnProps> = ({
	onRemove,
	onFullScreenEnter,
	period,
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(getDischargeTypes());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getDischarges({ dischargerange: period }));
	}, [dispatch, period]);

	const { total, success, status, dischargeTypeStatus, data, csvData } =
		useDisByDisTypeData();

	const { displaySize, onSizeChange } = useDisplaySize();

	const downloadOptions = (
		<DataDownloadButton
			csvData={csvData}
			title={t('admission.dischargebytype').replace(/ /g, '-')}
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
			{(status === 'LOADING' || dischargeTypeStatus === 'LOADING') && (
				<div className="item">
					<Skeleton />
				</div>
			)}

			{success && dischargeTypeStatus === 'SUCCESS' && (
				<DashboardCard
					cardRef={cardRef}
					title={t('admission.dischargebytype')}
					actions={actions}
					sizeChangeHandler={onSizeChange}
				>
					<Piechart data={data} width={'100%'} height={'calc(100% - 75px)'} />
					<DataSummary
						label={t('admission.disregistered')}
						value={total.toString()}
					/>
				</DashboardCard>
			)}
		</>
	);
};
