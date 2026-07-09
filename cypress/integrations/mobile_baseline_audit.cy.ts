/// <reference types="cypress" />

type AuditViewport = {
	name: string;
	width: number;
	height: number;
};

type AuditRoute = {
	order: string;
	name: string;
	path: string;
	selector: string;
	authenticated?: boolean;
};

const auditEnabled = Boolean(Cypress.env('MOBILE_AUDIT'));
const describeAudit = auditEnabled ? describe : describe.skip;
const viewportFilter = Cypress.env('MOBILE_AUDIT_VIEWPORT');
const routeFilter = Cypress.env('MOBILE_AUDIT_ROUTE');

const viewports: AuditViewport[] = [
	{ name: 'phone-small', width: 360, height: 740 },
	{ name: 'phone-modern', width: 390, height: 844 },
	{ name: 'fairphone-4', width: 411, height: 756 },
	{ name: 'tablet-portrait', width: 768, height: 1024 },
];

const routes: AuditRoute[] = [
	{
		order: '01',
		name: 'login',
		path: '/login',
		selector: '[data-cy=login-panel]',
	},
	{
		order: '02',
		name: 'dashboard',
		path: '/dashboard',
		selector: '[data-cy=dashboard]',
		authenticated: true,
	},
	{
		order: '03',
		name: 'patient-search',
		path: '/patients/search',
		selector: '[data-cy=search-patient]',
		authenticated: true,
	},
	{
		order: '04',
		name: 'patient-details',
		path: '/patients/details/1234563',
		selector: '[data-cy=patient-details]',
		authenticated: true,
	},
	{
		order: '05',
		name: 'visits',
		path: '/visits',
		selector: '.visits',
		authenticated: true,
	},
	{
		order: '06',
		name: 'laboratory',
		path: '/laboratory',
		selector: '.labs',
		authenticated: true,
	},
	{
		order: '07',
		name: 'admin',
		path: '/admin',
		selector: '[data-cy=admin-activity]',
		authenticated: true,
	},
];

const selectedViewports = viewports.filter((viewport) => {
	return !viewportFilter || viewport.name === viewportFilter;
});

const selectedRoutes = routes.filter((route) => {
	return !routeFilter || route.name === routeFilter;
});

const visitRoute = (route: AuditRoute) => {
	if (route.authenticated) {
		cy.authenticate(route.path);
		return;
	}

	cy.visit(route.path);
};

const logMobileMeasurements = () => {
	cy.window().then((win) => {
		const doc = win.document.documentElement;
		const body = win.document.body;
		const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
		const clientWidth = doc.clientWidth;
		const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
		const clientHeight = doc.clientHeight;
		const horizontalOverflow = scrollWidth - clientWidth;
		const verticalOverflow = scrollHeight - clientHeight;
		const bodyOverflow = win.getComputedStyle(body).overflow;

		cy.log(`horizontal overflow: ${horizontalOverflow}px`);
		cy.log(`vertical overflow: ${verticalOverflow}px`);
		cy.log(`body overflow: ${bodyOverflow}`);
	});
};

describeAudit('Mobile baseline audit', () => {
	selectedViewports.forEach((viewport) => {
		context(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
			beforeEach(() => {
				cy.viewport(viewport.width, viewport.height);
			});

			selectedRoutes.forEach((route) => {
				it(`captures ${route.name}`, () => {
					visitRoute(route);
					cy.get(route.selector, { timeout: 15000 }).should('be.visible');
					logMobileMeasurements();
					cy.screenshot(
						`mobile-baseline/${viewport.name}/${route.order}-${route.name}`,
						{
							capture: 'viewport',
						},
					);
				});
			});

			it('captures mobile menu navigation behavior', () => {
				visitRoute({
					order: '02',
					name: 'dashboard',
					path: '/dashboard',
					selector: '[data-cy=dashboard]',
					authenticated: true,
				});

				cy.dataCy('app-header-identified-trigger').click();
				cy.get('.appHeader').should('have.class', 'open_menu');
				cy.get('body').should('have.class', 'disable-scroll');
				cy.contains('.appHeader__nav__item', 'Patients').click();
				cy.location('pathname').should('eq', '/patients');

				cy.get('.appHeader').then(($header) => {
					cy.log(
						`menu remains open after navigation: ${$header.hasClass('open_menu')}`,
					);
				});

				cy.get('body').then(($body) => {
					cy.log(
						`body remains scroll-locked after navigation: ${$body.hasClass(
							'disable-scroll',
						)}`,
					);
				});

				cy.screenshot(
					`mobile-baseline/${viewport.name}/08-menu-after-navigation`,
					{
						capture: 'viewport',
					},
				);
			});
		});
	});
});
