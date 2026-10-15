/// <reference types="cypress" />

import { FIELD_LENGTHS } from '../../src/consts';

const WARD_START_PATH = '/admin/wards/new';
const PATIENT_START_PATH = '/patients/new';
const SUPPLIER_START_PATH = '/admin/suppliers/new';
const MEDICAL_TYPE_START_PATH = '/admin/types/medicals';
const USER_START_PATH = '/admin/users/new';
const ADMIN_START_PATH = '/admin';
const VACCINE_TYPE_START_PATH = '/admin/types/vaccines';
const DISEASE_TYPE_START_PATH = '/admin/types/diseases';
const OPERATION_TYPE_START_PATH = '/admin/types/operations';
const GROUP_WITHOUT_DESCRIPTION_PATH = '/admin/users/groups/edit/doc';
const TRIAGE_START_PATH = '/patients/details/1234563/triage';

const expectLimit = (fieldId: string, limit: number) => {
	cy.byId(fieldId).should('have.attr', 'maxlength', `${limit}`);
};

describe('Field length limits specs', () => {
	describe('Ward form', () => {
		it('should render the ui', () => {
			cy.authenticate(WARD_START_PATH);
			cy.byId('code').should('exist');
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
			cy.byId('code').should('exist');
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
			cy.byId('userName').should('exist');
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
			cy.authenticate(ADMIN_START_PATH);
			cy.dataCy('hospital-infos').click();
			cy.dataCy('edit-hospital').click();
			expectLimit('currencyCod', FIELD_LENGTHS.HospitalDTO.currencyCod);
		});
	});

	describe('Triage form', () => {
		it('should limit the note to what the examination accepts', () => {
			cy.authenticate(TRIAGE_START_PATH);
			expectLimit('pex_note', FIELD_LENGTHS.PatientExaminationDTO.pex_note);
		});
	});
	describe('Type forms whose code column holds one or two characters', () => {
		it('should limit the vaccine type code', () => {
			cy.authenticate(VACCINE_TYPE_START_PATH);
			cy.dataCy('add-vaccine-type').click();
			expectLimit('code', FIELD_LENGTHS.VaccineTypeDTO.code);
		});

		it('should limit the disease type code', () => {
			cy.authenticate(DISEASE_TYPE_START_PATH);
			cy.dataCy('add-disease-type').click();
			expectLimit('code', FIELD_LENGTHS.DiseaseTypeDTO.code);
		});

		it('should limit the operation type code', () => {
			cy.authenticate(OPERATION_TYPE_START_PATH);
			cy.dataCy('add-operation-type').click();
			expectLimit('code', FIELD_LENGTHS.OperationTypeDTO.code);
		});
	});

	describe('Remaining characters badge', () => {
		it('should stay on the field that already showed it', () => {
			cy.authenticate(SUPPLIER_START_PATH);
			cy.get('[data-cy=remaining-chars]').should('have.length', 1);
		});

		it('should not follow a field that only gained a limit', () => {
			cy.authenticate(WARD_START_PATH);
			cy.byId('code').should('exist');
			cy.get('[data-cy=remaining-chars]').should('not.exist');
		});
	});

	describe('Group without a description', () => {
		it('should render the form when the description the contract makes optional is absent', () => {
			cy.authenticate(GROUP_WITHOUT_DESCRIPTION_PATH);
			cy.byId('desc').should('exist');
		});
	});
});
