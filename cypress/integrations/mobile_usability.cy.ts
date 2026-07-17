/// <reference types="cypress" />

describe('Mobile usability spec', () => {
	beforeEach(() => {
		cy.viewport(390, 844);
	});

	it('should close the mobile menu and restore scrolling when navigating', () => {
		cy.authenticate('/dashboard');

		cy.dataCy('app-header-identified-trigger').click();
		cy.dataCy('app-header').should('have.class', 'open_menu');
		cy.get('body').should('have.class', 'disable-scroll');

		cy.get('.appHeader__nav__item').contains(/patients/i).click();

		cy.url().should('include', '/patients');
		cy.dataCy('app-header').should('not.have.class', 'open_menu');
		cy.get('body').should('not.have.class', 'disable-scroll');
	});

	it('should close the mobile menu when tapping the nav item of the current route', () => {
		cy.authenticate('/patients');

		cy.dataCy('app-header-identified-trigger').click();
		cy.dataCy('app-header').should('have.class', 'open_menu');
		cy.get('body').should('have.class', 'disable-scroll');

		// same-route navigation: the pathname does not change, the menu must close anyway
		cy.get('.appHeader__nav__item').contains(/patients/i).click();

		cy.url().should('include', '/patients');
		cy.dataCy('app-header').should('not.have.class', 'open_menu');
		cy.get('body').should('not.have.class', 'disable-scroll');
	});

	it('should close the mobile menu when navigating through the logo link', () => {
		cy.authenticate('/patients');

		cy.dataCy('app-header-identified-trigger').click();
		cy.get('body').should('have.class', 'disable-scroll');

		cy.get('.appHeader__identifier__logo a').click({ force: true });

		cy.dataCy('app-header').should('not.have.class', 'open_menu');
		cy.get('body').should('not.have.class', 'disable-scroll');
	});

	it('should keep the dashboard in natural document flow on a phone viewport', () => {
		cy.authenticate('/dashboard');

		cy.get('.dashboard').should(($el) => {
			expect($el.css('position')).not.to.equal('absolute');
			expect($el.css('min-height')).not.to.equal('0px');
		});
		cy.get('body').should('not.have.class', 'disable-scroll');
	});

	it('should let the patient search page scroll to its footer on a phone viewport', () => {
		cy.authenticate('/patients/search');

		cy.get('.searchPatient').should(($el) => {
			expect($el.css('position')).to.equal('relative');
		});
		cy.window().then((win) => {
			win.scrollTo(0, win.document.documentElement.scrollHeight);
		});
		cy.get('.searchPatient .footer').should('be.visible');
	});
});
