import { Skeleton } from '@mui/material';
import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { useOpdBySexData } from '../../../../../libraries/dashboardUtils/opds/useOpdBySexData';
import { searchOpds } from '../../../../../state/opds';
import { Piechart } from '../../../charts/pie/Piechart';
import DataDownloadButton from '../../../dataDownloadButton/DataDownloadButton';
import { DashboardCard } from '../../card/DashboardCard';
import '../../card/styles.scss';
import type { TDashboardCardOptionActions } from '../../card/types';
import { useDisplaySize } from '../../hooks';
import type { TDashboardComponentProps } from '../../layouts/types';
import { DataSummary } from '../../summary/DataSummary';
import type { IOwnProps } from '../types';

export const OpdBySex: FC<TDashboardComponentProps & IOwnProps> = ({
	onRemove,
	onFullScreenEnter,
	period,
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const opdbysexcardref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(searchOpds({ dateFrom: period[0], dateTo: period[1] }));
	}, [dispatch, period]);

	const { status, data, success, total, csvData } = useOpdBySexData();

	const { displaySize, onSizeChange } = useDisplaySize();

	const downloadOptions = (
		<DataDownloadButton
			csvData={csvData}
			title={t('opd.opdbysex').replace(/ /g, '-')}
			graphRef={opdbysexcardref}
		/>
	);

	const actions: TDashboardCardOptionActions = {
		onClose: onRemove ? () => onRemove() : undefined,
		onExpand: onFullScreenEnter ? () => onFullScreenEnter() : undefined,
		downloadButton: downloadOptions,
	};

	return (
		<>
			{status === 'LOADING' && (
				<div className="item">
					<Skeleton />
				</div>
			)}

			{success && (
				<DashboardCard
					cardRef={opdbysexcardref}
					title={t('opd.opdbysex')}
					actions={actions}
					sizeChangeHandler={onSizeChange}
				>
					<Piechart data={data} width={'100%'} height={'calc(100% - 75px)'} />
					<DataSummary
						label={t('opd.opdregistered')}
						value={total.toString()}
					/>
				</DashboardCard>
			)}
		</>
	);
};
