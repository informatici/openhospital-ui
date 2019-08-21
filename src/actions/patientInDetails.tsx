import {
	getPatientAPI,
} from '../helpers/api';

export const GET_PATIENT = 'GET_PATIENT';
export const CLEAR_PATIENT_IN_DETAILS = 'CLEAR_PATIENT_IN_DETAILS';

function getPatient(patient){
	return {
		type: GET_PATIENT,
		patient,
	}
}

export function getPatientThunk(id){
	return (dispatch) => {
		return getPatientAPI(id).then((patient) => {
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