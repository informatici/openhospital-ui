/// <reference types="cypress" />

describe('Patient Details / Administrative flag', () => {
	before(() => {
		cy.authenticate('/patients/details/1');
	});

	it('should warn that the patient has an administrative issue', () => {
		cy.dataCy('patient-details');
		cy.contains('Administrative issue');
	});

	it('should show the reason the administration gave', () => {
		cy.contains('Insurance still needs to be verified');
	});
});
