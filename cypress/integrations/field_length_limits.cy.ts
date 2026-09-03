/// <reference types="cypress" />

import { FIELD_LENGTHS } from '../../src/consts';

const WARD_START_PATH = '/admin/wards/new';
const PATIENT_START_PATH = '/patients/new';
const SUPPLIER_START_PATH = '/admin/suppliers/new';
const MEDICAL_TYPE_START_PATH = '/admin/types/medicals';
const USER_START_PATH = '/admin/users/new';
const HOSPITAL_START_PATH = '/admin/hospital/edit';
const PATIENT_DETAILS_START_PATH = '/patients/details/1234563';

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
			expectLimit('city', FIELD_LENGTHS.PatientDTO.city);
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

	describe('Supplier form', () => {
		it('should render the ui', () => {
			cy.authenticate(SUPPLIER_START_PATH);
			cy.byId('supName').type('ACME Pharma');
		});

		it('should limit every field to the length the API accepts', () => {
			expectLimit('supName', FIELD_LENGTHS.SupplierDTO.supName);
			expectLimit('supAddress', FIELD_LENGTHS.SupplierDTO.supAddress);
			expectLimit('supTaxcode', FIELD_LENGTHS.SupplierDTO.supTaxcode);
			expectLimit('supPhone', FIELD_LENGTHS.SupplierDTO.supPhone);
			expectLimit('supFax', FIELD_LENGTHS.SupplierDTO.supFax);
			expectLimit('supEmail', FIELD_LENGTHS.SupplierDTO.supEmail);
			expectLimit('supNote', FIELD_LENGTHS.SupplierDTO.supNote);
		});

		it('should keep only the characters that fit the limit', () => {
			cy.byId('supNote').type(
				'n'.repeat(FIELD_LENGTHS.SupplierDTO.supNote + 40),
			);
			cy.byId('supNote')
				.invoke('val')
				.should('have.length', FIELD_LENGTHS.SupplierDTO.supNote);
		});
	});

	describe('Medical type form', () => {
		it('should render the ui', () => {
			cy.authenticate(MEDICAL_TYPE_START_PATH);
			cy.dataCy('add-medical-type').click();
			cy.dataCy('sub-medical-title').contains('New medical type');
		});

		it('should keep the single character the code column holds', () => {
			expectLimit('code', FIELD_LENGTHS.MedicalTypeDTO.code);
			cy.byId('code').type('ABC', { delay: 0 });
			cy.byId('code').should('have.value', 'A');
		});
	});

	describe('User form', () => {
		it('should render the ui', () => {
			cy.authenticate(USER_START_PATH);
			cy.dataCy('activity-title').contains('New user');
		});

		it('should limit the user name and the description', () => {
			expectLimit('desc', FIELD_LENGTHS.UserDTO.desc);
			cy.byId('userName').type(
				'u'.repeat(FIELD_LENGTHS.UserDTO.userName + 10),
				{
					delay: 0,
				},
			);
			cy.byId('userName')
				.invoke('val')
				.should('have.length', FIELD_LENGTHS.UserDTO.userName);
		});
	});

	describe('Hospital form', () => {
		it('should limit the currency code', () => {
			cy.authenticate(HOSPITAL_START_PATH);
			expectLimit('currencyCod', FIELD_LENGTHS.HospitalDTO.currencyCod);
		});
	});

	describe('Triage form', () => {
		it('should limit the note to what the examination accepts', () => {
			cy.authenticate(PATIENT_DETAILS_START_PATH);
			cy.dataCy('patient-details-main-menu').contains('Triage').click();
			expectLimit('pex_note', FIELD_LENGTHS.PatientExaminationDTO.pex_note);
		});
	});
});
