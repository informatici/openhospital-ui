/// <reference types="cypress" />

describe('Change password activity spec', () => {
	beforeEach(() => {
		// log in as the mock "expired" user, whose password change is forced by the (mocked) server
		cy.visit('/', {
			onBeforeLoad(w) {
				w.sessionStorage.clear();
			},
		});
		cy.byId('username').type('expired');
		cy.byId('password').type('whatever');
		cy.get('.login__buttonContainer button').click();
		cy.dataCy('change-password-panel');
		cy.url().should('include', '/change-password');
	});

	it('rejects a password that violates the server-side policy', () => {
		// long enough but missing a digit and a special char -> fails the policy served by /auth/password-policy
		cy.byId('newPassword').type('abcdefgh').blur();
		cy.dataCy('change-password-panel').contains('Use letter, number, symbol');
	});

	it('accepts a policy-compliant password', () => {
		cy.byId('newPassword').type('Abcdef1@').blur();
		cy.dataCy('change-password-panel').should(
			'not.contain',
			'Use letter, number, symbol',
		);
	});
});
