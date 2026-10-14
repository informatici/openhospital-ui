import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';
import { PATHS } from '../../../consts';
import { useAppSelector } from '../../../libraries/hooks/redux';
import { scrollToElement } from '../../../libraries/uiUtils/scrollToElement';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '../../accessories/accordion/Accordion';
import AppHeader from '../../accessories/appHeader/AppHeader';
import Footer from '../../accessories/footer/Footer';
import classes from './AdminActivity.module.scss';
import SideMenu from './SideMenu/SideMenu';
import './styles.scss';

const AdminActivity = () => {
	const [expanded, setExpanded] = useState(false);
	const { t } = useTranslation();
	const matches = useMediaQuery('(min-width:768px)');
	const location = useLocation();

	const breadcrumbMap = {
		[t('nav.administration')]: PATHS.admin,
	};

	const userCredentials = useAppSelector(
		(state) => state.main.authentication?.data,
	);

	useEffect(() => {
		scrollToElement(null);
	}, []);

	// OH2-479: on mobile the admin section menu is a collapsible accordion.
	// Collapse it after navigating to a section so the selected content is
	// immediately visible instead of being pushed below the still-open menu.
	useEffect(() => {
		setExpanded(false);
	}, [location.pathname]);

	return (
		<div data-cy="admin-activity" className={classes.admin}>
			<AppHeader
				userCredentials={userCredentials}
				breadcrumbMap={breadcrumbMap}
			/>
			<div className={classes.content}>
				<div className={classes.sidebar}>
					{matches ? (
						<SideMenu />
					) : (
						<Accordion
							data-cy={'expandable-item'}
							expanded={matches ? true : expanded}
						>
							<AccordionSummary onClick={() => setExpanded(!expanded)}>
								<div className={classes.menuButton}>{t('common.menu')}</div>
							</AccordionSummary>
							<AccordionDetails>
								<SideMenu />
							</AccordionDetails>
						</Accordion>
					)}
				</div>
				<div className={classes.outlet}>
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminActivity;
