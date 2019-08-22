import {
	getPatientAPI,
} from '../../dummyAPI';

import { loading } from './loading'

export const GET_PATIENT = 'GET_PATIENT';
export const CLEAR_PATIENT_IN_DETAILS = 'CLEAR_PATIENT_IN_DETAILS';

export function getPatient(patient){
	return {
		type: GET_PATIENT,
		patient,
	}
}

export function getPatientThunk(id){
	return (dispatch) => {
		dispatch(loading(true))
		return getPatientAPI(id).then((patient) => {
			dispatch(loading(false))
			dispatch(getPatient(patient))
		})
	}
}

export function clearPatientInDetails(){
	return {
		type: CLEAR_PATIENT_IN_DETAILS,
		patient: {},
	}
} 