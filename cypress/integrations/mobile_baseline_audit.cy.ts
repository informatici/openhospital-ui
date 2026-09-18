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
const viewportFilter = Cypress.env('MOBILE_AUDIT_VIEWPORT') || 'phone-modern';
const routeFilter = Cypress.env('MOBILE_AUDIT_ROUTE');
const maxAllowedHorizontalOverflow = 1;

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
	return viewportFilter === 'all' || viewport.name === viewportFilter;
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

const assertPageFitsMobileViewport = () => {
	cy.window().then((win) => {
		const doc = win.document.documentElement;
		const body = win.document.body;
		const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
		const clientWidth = doc.clientWidth;
		const horizontalOverflow = scrollWidth - clientWidth;

		expect(
			horizontalOverflow,
			'page should not overflow horizontally on mobile',
		).to.be.at.most(maxAllowedHorizontalOverflow);
	});
};

const assertPageIsNotScrollLocked = () => {
	cy.window().then((win) => {
		const body = win.document.body;
		const bodyOverflowY = win.getComputedStyle(body).overflowY;

		expect(
			body.classList.contains('disable-scroll'),
			'body should not keep the mobile menu scroll lock',
		).to.eq(false);
		expect(
			bodyOverflowY,
			'body vertical scrolling should not be blocked',
		).to.not.eq('hidden');
	});
};

const assertPrimaryElementFitsMobileViewport = (selector: string) => {
	cy.window().then((win) => {
		cy.get(selector).then(($element) => {
			const rect = $element[0].getBoundingClientRect();
			const viewportWidth = win.innerWidth;

			expect(
				rect.left,
				'primary content should not start off-screen',
			).to.be.at.least(-maxAllowedHorizontalOverflow);
			expect(
				rect.right,
				'primary content should not end off-screen',
			).to.be.at.most(viewportWidth + maxAllowedHorizontalOverflow);
		});
	});
};

const assertMobileHeaderStartsClosed = () => {
	cy.get('.appHeader').should('be.visible');
	cy.get('.appHeader').should('not.have.class', 'open_menu');
	cy.get('body').should('not.have.class', 'disable-scroll');
};

const assertMobileNavigationTriggerIsUsable = () => {
	cy.dataCy('app-header-identified-trigger')
		.should('be.visible')
		.and('not.be.disabled');
};

describeAudit('Mobile baseline audit', () => {
	selectedViewports.forEach((viewport) => {
		context(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
			beforeEach(() => {
				cy.viewport(viewport.width, viewport.height);
			});

			selectedRoutes.forEach((route) => {
				it(`renders ${route.name} without basic mobile layout regressions`, () => {
					visitRoute(route);
					cy.get(route.selector, { timeout: 15000 }).should('be.visible');
					assertPageFitsMobileViewport();
					assertPageIsNotScrollLocked();
					assertPrimaryElementFitsMobileViewport(route.selector);

					if (route.authenticated) {
						assertMobileHeaderStartsClosed();
						assertMobileNavigationTriggerIsUsable();
					}

					cy.screenshot(
						`mobile-baseline/${viewport.name}/${route.order}-${route.name}`,
						{
							capture: 'viewport',
						},
					);
				});
			});

			it('opens and closes the mobile menu with the header trigger', () => {
				visitRoute({
					order: '02',
					name: 'dashboard',
					path: '/dashboard',
					selector: '[data-cy=dashboard]',
					authenticated: true,
				});

				assertMobileHeaderStartsClosed();
				assertMobileNavigationTriggerIsUsable();

				cy.dataCy('app-header-identified-trigger').click();
				cy.get('.appHeader').should('have.class', 'open_menu');
				cy.get('body').should('have.class', 'disable-scroll');

				cy.dataCy('app-header-identified-trigger').click();
				cy.get('.appHeader').should('not.have.class', 'open_menu');
				cy.get('body').should('not.have.class', 'disable-scroll');

				cy.screenshot(`mobile-baseline/${viewport.name}/08-menu-toggle`, {
					capture: 'viewport',
				});
			});

			it('closes the mobile menu after navigation', () => {
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
				cy.get('.appHeader').should('not.have.class', 'open_menu');
				cy.get('body').should('not.have.class', 'disable-scroll');

				cy.screenshot(
					`mobile-baseline/${viewport.name}/09-menu-after-navigation`,
					{
						capture: 'viewport',
					},
				);
			});
		});
	});
});
