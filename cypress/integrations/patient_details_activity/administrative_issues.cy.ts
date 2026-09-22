/// <reference types="cypress" />

describe('Patient Details / Administrative issues', () => {
	before(() => {
		cy.authenticate('/patients/details/1');
	});

	it('should warn that the patient has administrative issues to be solved', () => {
		cy.dataCy('patient-details');
		cy.contains('Administrative issues to be solved');
	});

	it('should list the reason of every open issue', () => {
		cy.contains('Identity document still to be verified');
		cy.contains('Registration form still to be signed');
	});
});
