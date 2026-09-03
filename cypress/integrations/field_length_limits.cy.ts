/// <reference types="cypress" />

import { FIELD_LENGTHS } from '../../src/consts';

const WARD_START_PATH = '/admin/wards/new';
const PATIENT_START_PATH = '/patients/new';

const expectLimit = (fieldId: string, limit: number) => {
	cy.byId(fieldId).should('have.attr', 'maxlength', `${limit}`);
};

describe('Field length limits specs', () => {
	describe('Ward form', () => {
		it('should render the ui', () => {
			cy.authenticate(WARD_START_PATH);
			cy.dataCy('activity-title').contains('Add Ward');
		});

		it('should limit every field to the length the API accepts', () => {
			expectLimit('code', FIELD_LENGTHS.WardDTO.code);
			expectLimit('description', FIELD_LENGTHS.WardDTO.description);
			expectLimit('telephone', FIELD_LENGTHS.WardDTO.telephone);
			expectLimit('fax', FIELD_LENGTHS.WardDTO.fax);
			expectLimit('email', FIELD_LENGTHS.WardDTO.email);
		});

		it('should keep only the characters that fit the limit', () => {
			cy.byId('code').clear().type('ABCDEFGHIJ', { delay: 0 });
			cy.byId('code').should('have.value', 'ABC');
		});
	});

	describe('Patient form', () => {
		it('should render the ui', () => {
			cy.authenticate(PATIENT_START_PATH);
			cy.dataCy('patient-data-form');
		});

		it('should limit every field to the length the API accepts', () => {
			expectLimit('firstName', FIELD_LENGTHS.PatientDTO.firstName);
			expectLimit('secondName', FIELD_LENGTHS.PatientDTO.secondName);
			expectLimit('taxCode', FIELD_LENGTHS.PatientDTO.taxCode);
			expectLimit('address', FIELD_LENGTHS.PatientDTO.address);
			expectLimit('telephone', FIELD_LENGTHS.PatientDTO.telephone);
			expectLimit('note', FIELD_LENGTHS.PatientDTO.note);
		});

		it('should keep only the characters that fit the limit', () => {
			const overLimit = 'a'.repeat(FIELD_LENGTHS.PatientDTO.taxCode + 10);
			cy.byId('taxCode').clear().type(overLimit, { delay: 0 });
			cy.byId('taxCode').should(
				'have.value',
				'a'.repeat(FIELD_LENGTHS.PatientDTO.taxCode),
			);
		});
	});
});
