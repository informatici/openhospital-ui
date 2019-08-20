// api fuctions, which will be used inside the thunks, to be imported when ready
import {
	getPatientsAPI,
	getPatientAPI,
} from '../helpers/api';

export const GET_PATIENTS = 'GET_PATIENTS';
export const GET_PATIENT = 'GET_PATIENT';
export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const UPDATE_PATIENT_DETAILS = 'UPDATE_PATIENT_DETAILS';

function getPatients(patients){
	return {
		type: GET_PATIENTS,
		patients,
	}
}

export function getPatientsThunk(){
	return (dispatch) => {
		return getPatientsAPI().then((patients) => {
			dispatch(getPatients(patients))
		})
	}
}

function addNewPatient(patient){
	return {
		type: ADD_NEW_PATIENT,
		patient,
	}
}

export function addNewPatientThunk(){
	return (dispatch) => {
		return null
	}
}

function deletePatient(patient){
	return {
		type: DELETE_PATIENT,
		patient,
	}
}

export function deletePatientThunk(){
	return (dispatch) => {
		return null
	}
}

function updatePatientDetails(patient){
	return {
		type: UPDATE_PATIENT_DETAILS,
		patient,
	}
}

export function updatePatientDetailsThunk(){
	return (dispatch) => {
		return null
	}
}