import { ErrorOutline } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { type FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	type Layout,
	type Layouts,
	Responsive,
	WidthProvider,
} from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { UserSettingDTO } from '../../../../../generated';
import {
	getLayouts,
	getLayoutsReset,
	resetLayouts,
	saveLayouts,
	saveLayoutsReset,
	setBreakpoint,
	setLayouts,
} from '../../../../../state/layouts';
import type { IState } from '../../../../../types';
import InfoBox from '../../../infoBox/InfoBox';
import { FullscreenCard } from '../../card/FullscreenCard';
import {
	addWidget,
	defaultGridLayoutBreakpoints,
	defaultGridLayoutCols,
	encodeLayout,
	getBreakpointFromWidth,
	getDefaultLayoutConfig,
	isEmptyLayout,
	removeDuplicates,
	removeWidget,
	toolboxDashboards,
} from '../consts';
import { GridLayoutItem } from '../item/GridLayoutItem';
import '../styles.scss';
import type { LayoutBreakpoints, TDashboardComponent } from '../types';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayoutContainer: FC = () => {
	const dispatch = useAppDispatch();

	const [mounted, setMounted] = useState(false);
	const [canUpdateLayouts, setCanUpdateLayouts] = useState(true);
	// starting at 'md' would let the first frame render as a desktop layout, so on a phone
	// dragging and resizing flash on before the first breakpoint change turns them off
	const [localBreakpoint, setLocalBreakpoint] = useState<string>(() =>
		typeof window !== 'undefined'
			? getBreakpointFromWidth(window.innerWidth)
			: 'md',
	);
	const [fsDashboard, setFsDashboard] = useState<
		TDashboardComponent | undefined
	>(undefined);
	const { t } = useTranslation();
	const infoBoxRef = useRef<HTMLDivElement>(null);
	const gridLayoutRef = useRef<HTMLDivElement>(null);

	const userCredentials = useAppSelector(
		(state) => state.main.authentication.data,
	);

	const layouts = useAppSelector((state) => state.layouts.layouts);

	const dashboardSetting = useAppSelector(
		(state) => state.layouts.getLayouts.data,
	);

	const toolbox = useAppSelector((state) => state.layouts.toolbox);

	useLayoutEffect(() => {
		if (gridLayoutRef.current) {
			setLocalBreakpoint(
				getBreakpointFromWidth(gridLayoutRef.current.offsetWidth),
			);
		}
	}, []);

	useEffect(() => {
		dispatch(getLayouts(userCredentials?.username ?? ''));
		setMounted(true);
	}, [dispatch, userCredentials]);

	const onRetry = () => {
		dispatch(getLayouts(userCredentials?.username ?? ''));
	};

	const onReset = () => {
		const layout = getDefaultLayoutConfig();
		const toolbox = toolboxDashboards(layout, {});
		const hasNoAllowedWidgets = isEmptyLayout(layout) && isEmptyLayout(toolbox);
		const setting = {
			...(dashboardSetting ?? {}),
			configName: 'dashboard',
			user: userCredentials?.username,
			configValue: encodeLayout({ layout, toolbox }),
		} as UserSettingDTO;

		dispatch(getLayoutsReset());
		dispatch(saveLayoutsReset());
		dispatch(resetLayouts());
		dispatch(setLayouts({ layouts: layout, toolbox }));
		if (!hasNoAllowedWidgets) {
			dispatch(saveLayouts(setting));
		}
	};

	const onBreakpointChange = (breakpoint: string) => {
		setLocalBreakpoint(breakpoint);
		dispatch(setBreakpoint(breakpoint));
	};

	const getRealBreakpoint = (): string => {
		if (gridLayoutRef.current) {
			return getBreakpointFromWidth(gridLayoutRef.current.offsetWidth);
		}

		return localBreakpoint;
	};

	const onLayoutChange = (_newLayout: Layout[], allLayouts: Layouts) => {
		if (!canUpdateLayouts) {
			setCanUpdateLayouts(true);
			return;
		}

		const currentBreakpoint = getRealBreakpoint();

		if (currentBreakpoint !== localBreakpoint) {
			return;
		}

		let setting: UserSettingDTO;

		if (!dashboardSetting) {
			setting = {
				configName: 'dashboard',
				user: userCredentials?.username,
			} as UserSettingDTO;
		} else {
			setting = { ...dashboardSetting };
		}

		setting.configValue = encodeLayout({ layout: allLayouts, toolbox });

		dispatch(saveLayouts(setting));
	};

	const onItemRemove = (item: Layout) => {
		const toolboxTmp = removeDuplicates({
			...toolbox,
			...addWidget(toolbox, item, localBreakpoint as LayoutBreakpoints),
		});

		const layoutsTmp = removeDuplicates({
			...layouts,
			...removeWidget(layouts, item),
		});

		setCanUpdateLayouts(false);
		dispatch(setLayouts({ layouts: layoutsTmp, toolbox: toolboxTmp }));

		let setting: UserSettingDTO;

		if (!dashboardSetting) {
			setting = {
				configName: 'dashboard',
				user: userCredentials?.username,
			} as UserSettingDTO;
		} else {
			setting = { ...dashboardSetting };
		}

		setting.configValue = encodeLayout({
			layout: layoutsTmp,
			toolbox: toolboxTmp,
		});

		dispatch(saveLayouts(setting));
	};

	const onFullScreenEnter = (label: TDashboardComponent) => {
		setFsDashboard(label);
	};

	const onFullScreenExit = () => {
		setFsDashboard(undefined);
	};

	const getLayoutsStatus = useAppSelector(
		(state: IState) => state.layouts.getLayouts.status,
	);

	const resetLayoutsStatus = useAppSelector(
		(state: IState) => state.layouts.resetLayouts.status,
	);

	const saveLayoutsStatus = useAppSelector(
		(state: IState) => state.layouts.saveLayouts.status,
	);

	const errorMessage = useAppSelector((state: IState) =>
		t(
			state.layouts.getLayouts.error?.message ||
				state.layouts.resetLayouts.error?.message ||
				'dashboard.cantretrieveconfig',
		),
	);

	const saveErrorMessage = useAppSelector((state: IState) =>
		t(state.layouts.saveLayouts.error?.message || 'dashboard.cantsaveconfig'),
	);
	const hasNoAllowedWidgets = isEmptyLayout(layouts) && isEmptyLayout(toolbox);

	// OH2-475: on phone widths the widgets stack full-width; disable drag/resize/drop there, since those
	// interactions are awkward on touch and would only let the user break the single-column mobile layout
	const isTouchLayout = localBreakpoint === 'xxs';

	return (
		<div ref={gridLayoutRef}>
			{(getLayoutsStatus === 'LOADING' || resetLayoutsStatus === 'LOADING') && (
				<CircularProgress style={{ marginLeft: '50%', position: 'relative' }} />
			)}

			{(getLayoutsStatus === 'FAIL' || resetLayoutsStatus === 'FAIL') && (
				<div className="error">
					<p>
						<ErrorOutline className="icon" color="primary" fontSize="large" />
					</p>
					<h2>{errorMessage}</h2>
					<div className="actions">
						<Button
							onClick={onRetry}
							variant="outlined"
							color="primary"
							style={{ marginRight: '10px' }}
						>
							{t('common.retry')}
						</Button>
						<Button
							onClick={onReset}
							variant="outlined"
							title={t('dashboard.resetcustomization')}
							color="secondary"
						>
							{t('dashboard.reset')}
						</Button>
					</div>
				</div>
			)}

			{(getLayoutsStatus === 'SUCCESS' || resetLayoutsStatus === 'SUCCESS') && (
				<>
					{saveLayoutsStatus === 'FAIL' && !hasNoAllowedWidgets && (
						<div ref={infoBoxRef} className="info-box-container">
							<InfoBox type="error" message={saveErrorMessage} />
						</div>
					)}

					{isEmptyLayout(layouts) && (
						<div
							ref={infoBoxRef}
							style={{ textAlign: 'center' }}
							className="info-box-container"
						>
							{hasNoAllowedWidgets ? (
								<InfoBox type="info" message={t('dashboard.noallowedwidget')} />
							) : (
								<InfoBox type="info" message={t('dashboard.emptylayout')} />
							)}
						</div>
					)}

					{!isEmptyLayout(layouts) && (
						<>
							<ResponsiveReactGridLayout
								className="layout"
								layouts={layouts}
								onBreakpointChange={onBreakpointChange}
								onLayoutChange={onLayoutChange}
								isDraggable={!isTouchLayout}
								isDroppable={!isTouchLayout}
								isResizable={!isTouchLayout}
								measureBeforeMount={false}
								useCSSTransforms={mounted}
								draggableHandle=".DashboardCard-item-header"
								resizeHandles={['ne', 'se']}
								breakpoints={defaultGridLayoutBreakpoints}
								cols={defaultGridLayoutCols}
							>
								{layouts[getRealBreakpoint()].map((l, _key) => {
									const ldash = l.i as TDashboardComponent;

									return (
										<div
											key={ldash}
											style={{ background: '#ccc' }}
											data-grid={l}
										>
											<GridLayoutItem
												dashboardKey={ldash}
												onRemove={() => onItemRemove(l)}
												onFullScreenEnter={() =>
													onFullScreenEnter(l.i as TDashboardComponent)
												}
											/>
										</div>
									);
								})}
							</ResponsiveReactGridLayout>

							<FullscreenCard
								dashboard={fsDashboard}
								onClose={onFullScreenExit}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default GridLayoutContainer;
